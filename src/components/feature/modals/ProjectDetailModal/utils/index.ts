/** 상세 문단 순번처럼 두 자리로 맞춰 적어야 하는 숫자에 씁니다. */
const padOrder = (order: number) => order.toString().padStart(2, '0');

export default padOrder;
