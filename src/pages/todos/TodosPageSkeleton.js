/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Skeleton } from '../../components/skeleton/Skeleton';

const todoPageContainerCSS = css`
  padding: 30px 20px;
  max-width: 1024px;
  margin: auto;
`;

const dataTablesContainerCSS = css`
  display: grid;
  gap: 30px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const dataTableContainerCSS = css`
  & > div:nth-of-type(2) {
    border-radius: 8px 8px 0 0;
  }
  & > div:nth-of-type(5) {
    border-radius: 0 0 8px 8px;
  }
`;

const rowContainerCSS = css`
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  align-items: center;
  gap: 16px;

  padding: 12px;
  border: 1px solid #e5e7eb;
`;

/**
 * Displays a skeleton for the todos page
 * @returns {JSX}
 */
function TodosPageSkeleton() {
  const skeletonRows = [1, 2, 3, 4];

  return (
    <div css={todoPageContainerCSS}>
      <Skeleton className='h-10 w-40 mb-16' />

      <div css={dataTablesContainerCSS}>
        <div css={dataTableContainerCSS}>
          <Skeleton className='h-6 w-20 mb-2' />
          {skeletonRows.map((row) => (
            <div css={rowContainerCSS} key={row}>
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-7 w-full' />
              <Skeleton className='h-7 w-full' />
              <Skeleton className='h-4 w-4' />
            </div>
          ))}
        </div>

        <div css={dataTableContainerCSS}>
          <Skeleton className='h-6 w-20 mb-2' />
          {skeletonRows.map((row) => (
            <div css={rowContainerCSS} key={row}>
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-7 w-full' />
              <Skeleton className='h-7 w-full' />
              <Skeleton className='h-4 w-4' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodosPageSkeleton;
