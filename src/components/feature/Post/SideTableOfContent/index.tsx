'use client';

import HoverToShow from '@/components/common/interaction/HoverToShow';
import SideFixedPositioner, {
  SideFixedPositionerVariants,
} from '@/components/common/layout/SideFixedPositioner';
import MarkdownNav from '@/components/common/lib/MarkdownNav';
import ShortTableOfContent from '@/components/common/lib/ShortTableOfContent';
import { VariantProps } from 'class-variance-authority';

interface SideTableOfContentProps {
  content: string;
  responsive?: VariantProps<typeof SideFixedPositionerVariants>['responsive'];
}

export default function SideTableOfContent({
  content,
  responsive = 'default',
}: SideTableOfContentProps) {
  return (
    <SideFixedPositioner responsive={responsive}>
      <HoverToShow
        nonHoverComponent={<ShortTableOfContent content={content} />}
        hoverComponent={
          <MarkdownNav
            markdown={content}
            className="bg-ink-0 border border-ink-200 rounded-r-2 p-s-5 shadow-lg max-h-[480px] overflow-y-auto scrollbar-hidden overscroll-contain"
          />
        }
      />
    </SideFixedPositioner>
  );
}

SideTableOfContent.defaultProps = {
  responsive: 'default',
};
