import React from 'react';
import Link from 'next/link';
import EntryViewTodoListPage from '../src/example-redux/EntryViewTodoListPage';

export default function IndexPage() {
  return (
    <>
      <h1>MVVM Todo List, but with Redux</h1>
      <Link href="/">
        <a>{'< Back to Home'}</a>
      </Link>

      <EntryViewTodoListPage />
    </>
  );
}
