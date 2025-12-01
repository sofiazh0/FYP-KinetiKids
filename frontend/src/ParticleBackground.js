// import React from 'react';
// import Particles from 'react-tsparticles';
// import { loadFull } from "tsparticles";

// const ParticleBackground = () => {
//     const particlesInit = async (main) => {
//         // This loads the tsparticles package bundle for the engine
//         await loadFull(main);
//     };

//     return (
//         <Particles
//             id="tsparticles"
//             init={particlesInit}
//             options={{
//                 background: {
//                     color: "#f7fbfe",  // Make sure this matches your landing page background
//                 },
//                 fpsLimit: 60,
//                 interactivity: {
//                     events: {
//                         onHover: {
//                             enable: true,
//                             mode: "repulse",
//                         },
//                         resize: true,
//                     },
//                     modes: {
//                         repulse: {
//                             distance: 100,
//                             duration: 0.4,
//                         },
//                     },
//                 },
//                 particles: {
//                     color: {
//                         value: "#2b6599",
//                     },
//                     links: {
//                         color: "#2b6599",
//                         distance: 150,
//                         enable: true,
//                         opacity: 0.5,
//                         width: 1,
//                     },
//                     collisions: {
//                         enable: true,
//                     },
//                     move: {
//                         direction: "none",
//                         enable: true,
//                         outModes: {
//                             default: "bounce",
//                         },
//                         random: false,
//                         speed: 1.5,
//                         straight: false,
//                     },
//                     number: {
//                         density: {
//                             enable: true,
//                             area: 800,
//                         },
//                         value: 80,
//                     },
//                     opacity: {
//                         value: 0.5,
//                     },
//                     shape: {
//                         type: "circle",
//                     },
//                     size: {
//                         value: { min: 1, max: 5 },
//                     },
//                 },
//                 detectRetina: true,
//             }}
//         />
//     );
// };

// export default ParticleBackground;
