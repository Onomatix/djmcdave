
export type Track = {
  id: number;
  title: string;
  genre: string;
  year: number;
  duration: string;
  audioUrl: string;
  mixcloudUrl: string;
  image: string;
};

export const musicData: Track[] = [
  {
    id: 1,
    title: "Studio 54 Disco Classics",
    genre: "Classic Nu Disco",
    year: 2023,
    duration: "3:42",
    audioUrl: "#",
    mixcloudUrl: "https://www.mixcloud.com/soundkontrols/",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Deep House Vibrations",
    genre: "Classic House Grooves",
    year: 2023,
    duration: "4:15",
    audioUrl: "#",
    mixcloudUrl: "https://www.mixcloud.com/soundkontrols/",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "80s Synth Wave",
    genre: "80s Extended 12'' Remix",
    year: 2022,
    duration: "3:58",
    audioUrl: "#",
    mixcloudUrl: "https://www.mixcloud.com/soundkontrols/",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "European Club Sessions",
    genre: "Euro Disco Club Hits",
    year: 2022,
    duration: "5:10",
    audioUrl: "#",
    mixcloudUrl: "https://www.mixcloud.com/soundkontrols/",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Soul Funk Classics",
    genre: "Old Skool R&B Classics",
    year: 2021,
    duration: "4:30",
    audioUrl: "#",
    mixcloudUrl: "https://www.mixcloud.com/soundkontrols/",
    image: "https://images.unsplash.com/photo-1526328828355-69b01701ca6a?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Groovy House Sessions",
    genre: "Classic House Grooves",
    year: 2021,
    duration: "6:25",
    audioUrl: "#",
    mixcloudUrl: "https://www.mixcloud.com/soundkontrols/",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop"
  }
];
