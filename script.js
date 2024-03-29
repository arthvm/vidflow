const videosContainer = document.querySelector(".videos__container");

async function fetchAndShowVideos() {
  try {
    const fetchVideos = await fetch("http://localhost:3000/videos");
    const videos = await fetchVideos.json();

    videos.forEach((video) => {
      if (video.categoria == "") {
        throw new Error("Video sem categoria");
      }
      videosContainer.innerHTML += `
          <li class="videos__item">
              <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
              <div class="descricao-video">
                <img class="img-canal" src=${video.imagem} alt="logo do canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
                <p class="categoria" hidden>${video.categoria}</p>
              </div>
          </li>
      `;
    });
  } catch (error) {
    videosContainer.innerHTML = `<p>Houve um erro ao carregar os videos: ${error}</p>`;
  }
}

fetchAndShowVideos();

//NOT BEST PRACTICE:

const searchBar = document.querySelector(".pesquisar__input");

searchBar.addEventListener("input", filterSearch);

function filterSearch() {
  const videos = document.querySelectorAll(".videos__item");
  const searchValue = searchBar.value.toUpperCase();

  videos.forEach((video) => {
    const title = video
      .querySelector(".titulo-video")
      .textContent.toUpperCase();

    video.style.display = searchBar
      ? title.includes(searchValue)
        ? "block"
        : "none"
      : "block";
  });
}

//NOT BEST PRACTICE (AGAIN!!!)

const categoryBtns = document.querySelectorAll(".superior__item");

categoryBtns.forEach((btn) => {
  let categoryName = btn.getAttribute("name");
  btn.addEventListener("click", () => {
    filterCategory(categoryName);
  });
});

function filterCategory(categoryFilter) {
  const videos = document.querySelectorAll(".videos__item");
  videos.forEach((video) => {
    let videoCategory = video
      .querySelector(".categoria")
      .textContent.toUpperCase();
    let filter = categoryFilter.toUpperCase();

    video.style.display =
      filter != "TUDO"
        ? videoCategory.includes(filter)
          ? "block"
          : "none"
        : "block";
  });
}
