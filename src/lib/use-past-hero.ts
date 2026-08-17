import { useEffect, useState } from "react";

/**
 * True once the hero section has scrolled fully out of view.
 *
 * Both floating controls — the sticky quote bar and the call button — hide until
 * this flips, so neither of them sits over the fold while the hero's own CTA is
 * still on screen doing the same job. Sharing one hook keeps them in step: two
 * separately-written observers would eventually drift, and a call button that
 * appeared a moment before or after the quote bar would read as a glitch.
 *
 * An IntersectionObserver rather than a scroll handler comparing `scrollY`
 * against a number. The hero's height changes with the viewport, with how the
 * headline wraps, and with mobile Safari collapsing its address bar mid-scroll,
 * so any fixed threshold would be wrong on most phones.
 */
export function usePastHero(heroId = "top") {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    // No hero on this route — leave the controls visible rather than stranding
    // them permanently hidden behind a condition that can never become true.
    if (!hero) {
      setPastHero(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  return pastHero;
}
