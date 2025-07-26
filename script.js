// Mostrar publicación predeterminada

// Esperar a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
  const initialPost = {
    title: "La Trascendencia del Vallenato en la Cultura Colombiana",
    content: `
La música vallenata es una de las expresiones más profundas del alma colombiana. Nacida en la región Caribe, ha sido el canal para contar historias, sentimientos y costumbres.

**Artistas como Diomedes Díaz, Jorge Oñate y Leandro Díaz** han marcado generaciones, mientras que **Carlos Vives** logró llevar el vallenato al mundo entero mezclándolo con pop y rock.

Las letras vallenatas son verdaderas poesías populares. Este género no solo entretiene: emociona, educa y representa a todo un país.
    `
  };

  createPost(initialPost.title, initialPost.content);
});

// Función para crear una publicación
function createPost(title, content) {
  const post = document.createElement('article');
  post.className = 'post';
  post.innerHTML = `
    <h3><i class="fas fa-guitar"></i> ${title}</h3>
    <p>${content.replace(/\n/g, '<br>')}</p>
    <div class="button-group">
      <button onclick="editPost(this)"><i class="fas fa-pen"></i> Editar</button>
      <button onclick="deletePost(this)"><i class="fas fa-trash"></i> Eliminar</button>
    </div>
  `;

  const container = document.getElementById('blog-posts');
  container.prepend(post);
}

// Agregar nueva publicación desde el formulario
function addPost() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const fileInput = document.getElementById('file-upload');
  const files = fileInput?.files;

  if (title === "" || content === "") {
    alert("Por favor, completa el título y contenido.");
    return;
  }

  let fileContent = '';
  if (files && files.length > 0) {
    fileContent = '<div class="attachments">';
    Array.from(files).forEach(file => {
      const fileURL = URL.createObjectURL(file);
      const isImage = file.type.startsWith('image/');
      if (isImage) {
        fileContent += `<img src="${fileURL}" alt="Imagen Adjunta" class="attached-image" />`;
      } else {
        fileContent += `<p><a href="${fileURL}" target="_blank">${file.name}</a></p>`;
      }
    });
    fileContent += '</div>';
  }

  createPost(title, content + fileContent);

  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  if (fileInput) fileInput.value = '';
}

// Editar una publicación existente
function editPost(button) {
  const article = button.closest('article');
  const title = article.querySelector('h3');
  const content = article.querySelector('p');

  const newTitle = prompt("Editar título:", title.textContent.replace(/^\s*\S+\s*/, ''));
  const newContent = prompt("Editar contenido:", content.innerText);

  if (newTitle && newContent) {
    title.innerHTML = `<i class=\"fas fa-guitar\"></i> ${newTitle}`;
    content.innerHTML = newContent.replace(/\n/g, '<br>');
  }
}

// Eliminar publicación
function deletePost(button) {
  const article = button.closest('article');
  if (confirm("¿Seguro que deseas eliminar esta publicación?")) {
    article.remove();
  }
}
