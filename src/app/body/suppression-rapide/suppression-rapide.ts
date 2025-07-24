import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-suppression-rapide',
  templateUrl: './suppression-rapide.html',
  styleUrls: ['./suppression-rapide.css']
})
export class SuppressionRapideComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    document.querySelectorAll('.delete-item').forEach(button => {
      button.addEventListener('click', (event) => {
        const recipeItem = (event.currentTarget as HTMLElement).closest('.recipe-item') as HTMLElement;

        if (recipeItem) {
          recipeItem.classList.add('animate__animated', 'animate__fadeOut');

          setTimeout(() => {
            recipeItem.remove();

            const notification = document.createElement('div');
            notification.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 animate__animated animate__fadeInDown';
            notification.textContent = 'Recette supprimée avec succès !';
            notification.style.zIndex = '1000';
            document.body.appendChild(notification);

            setTimeout(() => {
              notification.classList.add('animate__fadeOut');
              setTimeout(() => notification.remove(), 300);
            }, 2000);
          }, 300);
        }
      });
    });

    const form = document.getElementById('deleteForm') as HTMLFormElement;
    const input = document.getElementById('recette') as HTMLInputElement;
    const recipeList = document.querySelector('.recipe-list') as HTMLElement;

    if (form && input && recipeList) {
      form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const recipeName = input.value.trim();

        if (recipeName !== '') {
          const newRecipe = document.createElement('div');
          newRecipe.className = 'recipe-item animate__animated animate__fadeIn';
          newRecipe.innerHTML = `
            <span>${recipeName}</span>
            <button class="delete-item"><i class="fas fa-times"></i></button>
          `;

          recipeList.appendChild(newRecipe);

          const deleteButton = newRecipe.querySelector('.delete-item') as HTMLButtonElement;
          deleteButton.addEventListener('click', (event) => {
            const recipeItem = (event.currentTarget as HTMLElement).closest('.recipe-item') as HTMLElement;
            if (recipeItem) {
              recipeItem.classList.add('animate__fadeOut');
              setTimeout(() => recipeItem.remove(), 300);
            }
          });

          const notification = document.createElement('div');
          notification.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 animate__animated animate__fadeInDown';
          notification.textContent = `Recette "${recipeName}" supprimée avec succès !`;
          notification.style.zIndex = '1000';
          document.body.appendChild(notification);

          setTimeout(() => {
            notification.classList.add('animate__fadeOut');
            setTimeout(() => notification.remove(), 300);
          }, 2000);

          input.value = '';
        }
      });
    }
  }
}
