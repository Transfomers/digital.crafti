export const listVariants = {
  show: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.04,
    },
  },
};

export const listItemsVariants = {
  hidden: {
    x: -25,
    opacity: 0,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

export const linkVariants = {
  initial: { x: 0 },
  hover: { x: 0 },
};

export const videoRevealVariants = {
  hidden: { width: 0 },
  show: { width: '100%' },
};

export const videoVariants = {
  hidden: { opacity: 0, transition: { delay: 0.05 } },
  show: { opacity: 1 },
};

export const transition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1],
};
