/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Skeleton } from '../../components/skeleton/Skeleton';

const todoDetailsPageContainerCss = css`
  padding: 30px 20px;
  max-width: 1024px;
  margin: auto;
`;

const detailsContainerCss = css`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 30px 16px;

  display: grid;
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
`;

const detailContainerCss = css`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px;

  & > div:nth-of-type(3) {
    grid-column: 1/-1;
  }
`;

const buttonsContainerCss = css`
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: end;
    gap: 20px;
  }
`;

/**
 * Displays a skeleton for the todo details page
 * @returns {JSX}
 */
function TodoDetailsPageSkeleton() {
  const skeletonRows = [1, 2, 3, 4];
  return (
    <div css={todoDetailsPageContainerCss}>
      <Skeleton className='h-10 w-32 mb-5' />
      <Skeleton className='h-10 w-48 mb-5' />

      <div css={detailsContainerCss}>
        {skeletonRows.map((row) => (
          <div css={detailContainerCss}>
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-12' />
            <Skeleton className='h-4 w-24' />
          </div>
        ))}
      </div>

      <div css={buttonsContainerCss}>
        <Skeleton className='h-9 w-full sm:w-20 mt-8 sm:mt-8' />
        <Skeleton className='h-9 w-full sm:w-20 mt-4 sm:mt-8' />
      </div>
    </div>
  );
}

export default TodoDetailsPageSkeleton;
