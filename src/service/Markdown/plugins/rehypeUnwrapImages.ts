import { visit } from 'unist-util-visit';
import type { Element, ElementContent, Root } from 'hast';

function isImage(child: ElementContent): child is Element {
  return child.type === 'element' && child.tagName === 'img';
}

function isEmptyText(child: ElementContent): boolean {
  return child.type === 'text' && child.value.trim() === '';
}

/**
 * 이미지만 들어 있는 문단(<p><img /></p>)에서 <p>를 벗겨낸다.
 * Img 컴포넌트가 캡션을 <figure>로 렌더링할 때 <p> 안에 블록 요소가
 * 중첩되면 브라우저 파싱 결과가 달라져 hydration이 깨지기 때문이다.
 */
export default function rehypeUnwrapImages() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === undefined) return;

      const images = node.children.filter(isImage);
      const hasOnlyImages =
        images.length > 0 &&
        node.children.every((child) => isImage(child) || isEmptyText(child));

      if (!hasOnlyImages) return;

      parent.children.splice(index, 1, ...images);
    });
  };
}
