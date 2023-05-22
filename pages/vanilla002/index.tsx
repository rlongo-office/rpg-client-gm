import * as React from 'react'
import Link from 'next/link';

function Vanilla002() {

  return (
    <div>
        <a>Vanilla Page 2</a>
        <Link href="/vanilla001">
          <a>
            <img src="/nav/player.png" alt="Player" />
          </a>
        </Link>
        <Link href="/vanilla002">
          <a>
            <img src="/nav/skills.png" alt="Skills" />
          </a>
        </Link>
    </div>
  )
}

  export default Vanilla002