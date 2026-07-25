interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * @description 검색엔진 리치 결과를 위한 JSON-LD 구조화 데이터를 렌더링합니다.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
