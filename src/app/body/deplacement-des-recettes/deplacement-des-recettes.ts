import { AfterViewInit, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-deplacement-des-recettes',
  templateUrl: './deplacement-des-recettes.html',
  styleUrls: ['./deplacement-des-recettes.css']
})
export class DeplacementDesRecettes implements AfterViewInit {

  ngAfterViewInit(): void {
    const recipeItems = document.querySelectorAll('.recipe-item');
    const dayColumns = document.querySelectorAll('.day-column');
    let draggedItem: HTMLElement | null = null;

    recipeItems.forEach(item => {
      item.addEventListener('dragstart', () => {
        draggedItem = item as HTMLElement;
        setTimeout(() => {
          item.classList.add('dragging');
        }, 0);
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
    });

    dayColumns.forEach(column => {
      column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('highlight');
      });

      column.addEventListener('dragleave', () => {
        column.classList.remove('highlight');
      });

      column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.classList.remove('highlight');
        const recipeList = column.querySelector('.recipe-list');
        if (recipeList && draggedItem) {
          recipeList.appendChild(draggedItem);
          this.showNotification('Recette déplacée avec succès !', 'success');
        }
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const recipeItem = (btn as HTMLElement).closest('.recipe-item');
        if (recipeItem) {
          recipeItem.classList.add('animate__animated', 'animate__fadeOut');
          setTimeout(() => {
            recipeItem.remove();
            this.showNotification('Recette supprimée !', 'danger');
          }, 300);
        }
      });
    });

    const saveBtn = document.querySelector('.btn-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.showNotification('Organisation enregistrée !', 'success');
      });
    }

    document.querySelectorAll('.recipe-list').forEach(list => {
      list.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragEvent = e as DragEvent; // 👈 cast ici
        const afterElement = this.getDragAfterElement(list, dragEvent.clientY);
        const dragging = document.querySelector('.dragging');
        if (dragging) {
          if (!afterElement) {
            list.appendChild(dragging);
          } else {
            list.insertBefore(dragging, afterElement);
          }
        }
      });
    });
  }

  private getDragAfterElement(container: Element, y: number): Element | null {
    const draggableElements = [...container.querySelectorAll('.recipe-item:not(.dragging)')];

    return draggableElements.reduce<{ offset: number; element: Element | null }>((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
  }

  private showNotification(message: string, type: string): void {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification animate__animated animate__fadeInDown`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate__fadeOut');
      setTimeout(() => notification.remove(), 500);
    }, 2000);
  }
}
