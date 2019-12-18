import React from 'react';
import Link from 'next/link';
import ViewTodoListPage from '../src/example-simple/ViewTodoListPage';

export default function IndexPage() {
  return (
    <>
      <h1>MVVM Todo List</h1>
      <Link href="/">
        <a>{'< Back to Home'}</a>
      </Link>

      <ViewTodoListPage />
    </>
  );
}
