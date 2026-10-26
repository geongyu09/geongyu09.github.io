/** 상세 문단 순번처럼 두 자리로 맞춰 적어야 하는 숫자에 씁니다. */
const padOrder = (order: number) => order.toString().padStart(2, '0');

/** 블로그 안의 주소는 슬래시로 시작하므로, 새 창을 띄울 바깥 주소인지 이것으로 가릅니다. */
export const isInternalHref = (href: string) => href.startsWith('/');

export default padOrder;
