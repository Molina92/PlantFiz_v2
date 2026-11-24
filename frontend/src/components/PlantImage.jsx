import placeholder from "../assets/plant.svg";

// eslint-disable-next-line react/prop-types -- The image receives scalar fields from the plant record.
const PlantImage = ({ src, alt, loading = "lazy" }) => (
  <img
    key={src}
    className="store-plant-image"
    data-placeholder={src ? undefined : "true"}
    src={src || placeholder}
    alt={alt}
    loading={loading}
    onError={(event) => {
      const image = event.currentTarget;
      if (image.getAttribute("src") !== placeholder) {
        image.dataset.placeholder = "true";
        image.src = placeholder;
      }
    }}
  />
);

export default PlantImage;
