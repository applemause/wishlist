const STORAGE_KEY = "wishlist-items-v1";

const form = document.getElementById("wishlist-form");
const itemsRoot = document.getElementById("wishlist-items");
const emptyState = document.getElementById("empty-state");
const clearAllButton = document.getElementById("clear-all");
const cardTemplate = document.getElementById("wishlist-card-template");

let wishlistItems = loadItems();

render();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title").toString().trim();
  const description = formData.get("description").toString().trim();
  const link = formData.get("link").toString().trim();
  const priority = formData.get("priority").toString();

  if (!title) {
    return;
  }

  wishlistItems.unshift({
    id: crypto.randomUUID(),
    title,
    description,
    link,
    priority,
  });

  persistItems();
  render();
  form.reset();
});

clearAllButton.addEventListener("click", () => {
  if (!wishlistItems.length) {
    return;
  }

  const confirmed = window.confirm("Удалить все желания?");
  if (!confirmed) {
    return;
  }

  wishlistItems = [];
  persistItems();
  render();
});

function loadItems() {
  const savedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!savedValue) {
    return [
      {
        id: crypto.randomUUID(),
        title: "Kindle Paperwhite",
        description: "Для чтения вечером, лучше версия с теплой подсветкой.",
        link: "https://www.amazon.de/",
        priority: "Очень хочу",
      },
      {
        id: crypto.randomUUID(),
        title: "Lego Icons",
        description: "Что-нибудь красивое для полки в гостиной.",
        link: "",
        priority: "Буду рад(а)",
      },
    ];
  }

  try {
    const parsed = JSON.parse(savedValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistItems() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
}

function render() {
  itemsRoot.innerHTML = "";
  emptyState.classList.toggle("is-hidden", wishlistItems.length > 0);

  wishlistItems.forEach((item) => {
    const cardFragment = cardTemplate.content.cloneNode(true);
    const card = cardFragment.querySelector(".wish-card");
    const priorityPill = cardFragment.querySelector(".priority-pill");
    const title = cardFragment.querySelector(".wish-title");
    const description = cardFragment.querySelector(".wish-description");
    const link = cardFragment.querySelector(".wish-link");
    const deleteButton = cardFragment.querySelector(".delete-button");

    priorityPill.textContent = item.priority;
    title.textContent = item.title;
    description.textContent = item.description || "Описание можно добавить позже.";

    if (item.link) {
      link.href = item.link;
    } else {
      link.classList.add("is-hidden");
    }

    deleteButton.addEventListener("click", () => {
      wishlistItems = wishlistItems.filter((entry) => entry.id !== item.id);
      persistItems();
      render();
    });

    itemsRoot.append(card);
  });
}
