import ApartmentCardPreview from "./ApartmentCardPreview";

export default function DiscoverList() {
  return (
    <div className="grid grid-rows gap-4  ">
      {Array.from({ length: 5 }, (_, i) => (
        <ApartmentCardPreview key={i} className="mb-4" />
      ))}
    </div>
  );
}
