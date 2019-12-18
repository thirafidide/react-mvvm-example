import React from 'react';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <>
      <h1>MVVM Example</h1>

      <ul>
        <li>
          <Link href="example-simple">
            <a>Simple Example</a>
          </Link>
        </li>

        <li>
          <Link href="example-redux">
            <a>WIP: Example with Redux</a>
          </Link>
        </li>
      </ul>
    </>
  );
}
