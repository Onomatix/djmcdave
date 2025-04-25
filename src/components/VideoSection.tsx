import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import videoData from "../data/videos.json";

type VideoData = {
  id: string;
  title: string;
  description: string;
  category: string;
};

function VideosSection() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const { featuredVideos } = videoData;

  useEffect(() => {
    const fetchVideos = async () => {
      const promises = featuredVideos.map(async (video) => {
        const url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${video.id}`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          return {
            ...video,
            title: data.title || video.title,
            description: data.description || video.description
          };
        } catch (error) {
          console.warn(`Failed to fetch metadata for video ${video.id}`, error);
          return video;
        }
      });

      const results = await Promise.all(promises);
      setVideos(results);
    };

    fetchVideos();
  }, []);

  return (
    <section id="videos" className="content-section">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Videos</h2>
        <p className="section-subtitle">
          Watch my latest performances and music videos
        </p>

        <div className="max-w-4xl mx-auto">
          {videos.map((video) => (
            <div key={video.id} className="glass-card overflow-hidden rounded-xl mb-8">
              <div className="aspect-video relative">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${video.id}`}
                  width="100%"
                  height="100%"
                  controls
                  playing={false}
                  light={true}
                  config={{
                    playerVars: {
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      origin: window.location.origin,
                      enablejsapi: 1,
                      playsinline: 1
                    }
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-white">{video.title}</h3>
                <p className="text-white/70 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideosSection;
