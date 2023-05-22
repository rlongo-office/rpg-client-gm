import * as React from 'react'
import Link from 'next/link';

function Vanilla001() {

  return (
    <div>
        <a>Vanilla Page 1</a>
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

export default Vanilla001