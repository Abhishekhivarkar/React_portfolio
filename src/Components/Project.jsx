import React, { useState } from "react";

// Assuming ProjectDetails component is defined/imported somewhere else
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="modal">
      <button onClick={closeModal}>Close</button>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{subDescription}</p>
      {image && <img src={image} alt={title} />}
      <div>
        {tags.map((tag) => (
          <span key={tag.id}>{tag.name}</span>
        ))}
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer">
        Visit Website
      </a>
    </div>
  );
};

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl">{title}</p>
          <div className="flex gap-5 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation"
        >
          {/* Use dynamic href here */}
          <a href={href} target="_parent" rel="noopener noreferrer">
            Go to Web
          </a>
          <img src="assets/arrow-right.svg" className="w-5" alt="arrow" />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
