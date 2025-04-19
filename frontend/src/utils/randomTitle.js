// List of possible titles
const titles = [
    "Hit the road, find your wild.",
    "Your adventure, your van, your way.",
    "Where will your van take you?",
    "Unlock the road less traveled.",
    "Rent the van. Plan the journey. Live the adventure.",
    "Vans, views, and endless adventure await.",
    "Drive into the wild, and make it your own.",
    "Van life starts here — adventure is calling.",
    "Roam free. Plan your perfect getaway.",
    "From your driveway to the wildest roads.",
  ];
  
  // Function to get a random title
  export const getRandomTitle = () => {
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
  };