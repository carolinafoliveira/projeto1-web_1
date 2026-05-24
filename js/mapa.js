const searchInput = document.querySelector("[data-map-search]");
const mapPins = Array.from(document.querySelectorAll(".map-pin"));

if (searchInput && mapPins.length) {
  const activatePin = (pin) => {
    mapPins.forEach((item) => item.classList.toggle("is-active", item === pin));
  };

  const filterPins = () => {
    const query = searchInput.value.trim().toLowerCase().replace(/^sala\s+\d+$/, "sala");

    let firstMatch = null;

    mapPins.forEach((pin) => {
      const haystack = `${pin.dataset.location} ${pin.dataset.keywords}`.toLowerCase();
      const matches = !query || haystack.includes(query);

      pin.classList.toggle("is-hidden", !matches);

      if (!firstMatch && matches) {
        firstMatch = pin;
      }
    });

    if (firstMatch) {
      activatePin(firstMatch);
    } else {
      mapPins.forEach((pin) => pin.classList.remove("is-active"));
    }
  };

  mapPins.forEach((pin) => {
    pin.addEventListener("mouseenter", () => activatePin(pin));
    pin.addEventListener("focus", () => activatePin(pin));
    pin.addEventListener("click", () => activatePin(pin));
  });

  searchInput.addEventListener("input", filterPins);

  const params = new URLSearchParams(window.location.search);
  const initialLocation = params.get("local");

  if (initialLocation) {
    searchInput.value = initialLocation;
    filterPins();
    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
