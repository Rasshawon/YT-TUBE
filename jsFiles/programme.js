const loadCategories = () => {
  //* fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const loadCategoriesVideo = (id) => {
  fetch(` https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      //*remove all active class\
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  const detailContainer = document.getElementById("modal-content");
  // document.getElementById("showModalData").click();
  detailContainer.innerHTML = `
  <img src="${video.thumbnail}" alt="" />
  <p>${video.description}</p>
    `;
  document.getElementById("customModal").showModal();
};

// *display data
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    //*create button {category_id: '1001', category: 'Music'}
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class="btn category-btn">
    ${item.category}
    </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};
loadCategories();

//*vedio load
const loadVideos = () => {
  //* fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

//*time convert
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hr ${minute} min ${remainingSecond} sec ago`;
}

// *display video
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class=" flex flex-col min-h-[300px] w-full gap-5 justify-center items-center mx-auto">
    <img src="/asset/Icon.png"/>
    <h2 class="text-center font-bold text-xl">No Content Here in this category</h2>
    </div>`;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = `card card-compact`;
    card.innerHTML = `  
    <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute right-2 bottom-2 text-gray-200 bg-black text-sm p-1">
            ${getTimeString(video.others.posted_date)}
          </span>`
      }


  </figure>
  <div class="flex px-0 py-2 gap-2">
    <div>
    <img class="w-10 h-10 object-cover rounded-full" src="${
      video.authors[0].profile_picture
    }" alt="" />
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
${
  video.authors[0].verified == true
    ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=2sZ0sdlG9kWP&format=png" alt="verification batch" />`
    : ""
}

   
    </div>
    <p><button onclick="loadDetails('${
      video.video_id
    }')" class="btn btn-sm btn-error">details</button></p
    </div>
    </div>
  </div>
  `;
    videoContainer.appendChild(card);
  });
};

loadVideos();
