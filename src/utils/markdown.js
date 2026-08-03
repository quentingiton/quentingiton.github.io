import { marked } from "marked";

// Display maths first, so that "$$...$$" is not eaten by the single-dollar rule.
const MATH =
  /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^$\n]+?\$|\\\([\s\S]*?\\\))/g;

marked.setOptions({ gfm: true, breaks: false });

/**
 * Turn a Markdown string into HTML, leaving any TeX untouched.
 *
 * Markdown and TeX disagree about "_" and "\": left alone, "$x_1 + x_2$" comes
 * out as italics rather than a formula. So the maths is lifted out before
 * parsing and dropped back in afterwards, for MathJax to pick up later.
 */
export function renderMarkdown(source) {
  if (!source) return "";

  const formulas = [];
  const masked = source.replace(MATH, (formula) => {
    formulas.push(formula);
    return `%%MATH${formulas.length - 1}%%`;
  });

  return marked
    .parse(masked)
    .replace(/%%MATH(\d+)%%/g, (_, index) => formulas[Number(index)]);
}

/**
 * Ask MathJax to typeset an element that was just filled with rendered HTML.
 * MathJax only scans the page once, on load, so anything rendered afterwards
 * has to be queued by hand.
 */
export function typesetMath(element) {
  const mathJax = window.MathJax;
  if (element && mathJax && mathJax.Hub) {
    mathJax.Hub.Queue(["Typeset", mathJax.Hub, element]);
  }
}
