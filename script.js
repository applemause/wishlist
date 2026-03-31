const wishlistItems = [
  {
    title: "Wiiuka Case for iPhone 16 Pro, Leather",
    price: "50 EUR",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    link: "https://www.amazon.de/-/en/dp/B0DJYL6P77/?coliid=I3LO5LTVY8YSVL&colid=24BXUX7RJO8CT&psc=1&ref_=list_c_wl_lv_ov_lig_dp_it",
  },
  {
    title: "Mobile Phone Ring for MagSafe - Magnetic Holder",
    price: "16 EUR",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    link: "https://www.amazon.de/-/en/dp/B0DGVG1K6Z/?coliid=I3QKQEWIYON8YW&colid=24BXUX7RJO8CT&ref_=list_c_wl_lv_ov_lig_dp_it&th=1",
  },
  {
    title: "Lego Icons Set",
    price: "199 EUR",
    image:
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80",
    link: "https://www.lego.com/",
  },
  {
    title: "Fujifilm Instax Mini Evo",
    price: "189 EUR",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    link: "https://www.fujifilm.com/",
  },
];

const itemsRoot = document.getElementById("wishlist-items");
const cardTemplate = document.getElementById("wishlist-card-template");

wishlistItems.forEach((item) => {
  const cardFragment = cardTemplate.content.cloneNode(true);
  const image = cardFragment.querySelector(".wish-image");
  const title = cardFragment.querySelector(".wish-title");
  const price = cardFragment.querySelector(".wish-price");
  const link = cardFragment.querySelector(".wish-link");

  image.src = item.image;
  image.alt = item.title;
  title.textContent = item.title;
  price.textContent = item.price;
  link.href = item.link;

  itemsRoot.append(cardFragment);
});
