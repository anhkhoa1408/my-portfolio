import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

export function useTextReveal(domTarget: string) {
  onMounted(() => {
    new SplitType(domTarget, {
      types: "words",
      tagName: "span",
    });

    gsap.fromTo(
      `${domTarget} .word`,
      {
        willChange: "transform, opacity",
        y: "100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: domTarget,
          start: "top 60%",
          end: "bottom 60%",
        },
        stagger: 0.2,
      },
    );
  });
}
