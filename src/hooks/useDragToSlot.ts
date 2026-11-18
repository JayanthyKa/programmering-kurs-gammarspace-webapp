import { useRef, useState } from 'react'
import type { MouseEvent, PointerEvent } from 'react'

const DRAG_THRESHOLD = 6
const SLOT_PADDING = 18

interface DragSession {
  pointerId: number
  word: string
  startX: number
  startY: number
  /** Pointer offset inside the chip, so the ghost stays under the finger. */
  offsetX: number
  offsetY: number
  width: number
  height: number
  active: boolean
}

export interface DragGhost {
  word: string
  left: number
  top: number
  width: number
  height: number
  over: boolean
}

/**
 * Drag a word chip into a single drop slot using Pointer Events, so the same code path
 * covers mouse, touch and pen. A press without movement stays a normal click, which is
 * how tap-to-place and keyboard activation work.
 */
interface DragToSlotOptions {
  /** A chip was dragged and released over the slot. */
  onDrop: (word: string) => void
  /** A chip was clicked, tapped or activated from the keyboard. */
  onActivate: (word: string) => void
  enabled: boolean
}

export function useDragToSlot({ onDrop, onActivate, enabled }: DragToSlotOptions) {
  const slotRef = useRef<HTMLSpanElement>(null)
  const session = useRef<DragSession | null>(null)
  const suppressClick = useRef(false)
  const [ghost, setGhost] = useState<DragGhost | null>(null)

  const isOverSlot = (x: number, y: number) => {
    const rect = slotRef.current?.getBoundingClientRect()
    if (!rect) return false
    return (
      x >= rect.left - SLOT_PADDING &&
      x <= rect.right + SLOT_PADDING &&
      y >= rect.top - SLOT_PADDING &&
      y <= rect.bottom + SLOT_PADDING
    )
  }

  const endDrag = () => {
    session.current = null
    setGhost(null)
  }

  const chipProps = (word: string) => ({
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
      if (!enabled || (event.pointerType === 'mouse' && event.button !== 0)) return
      suppressClick.current = false
      const rect = event.currentTarget.getBoundingClientRect()
      session.current = {
        pointerId: event.pointerId,
        word,
        startX: event.clientX,
        startY: event.clientY,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        width: rect.width,
        height: rect.height,
        active: false,
      }
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        // Without capture the drag simply ends if the pointer leaves the chip.
      }
    },
    onPointerMove: (event: PointerEvent<HTMLButtonElement>) => {
      const current = session.current
      if (!current || current.pointerId !== event.pointerId) return
      if (!current.active) {
        const distance = Math.hypot(event.clientX - current.startX, event.clientY - current.startY)
        if (distance < DRAG_THRESHOLD) return
        current.active = true
      }
      setGhost({
        word: current.word,
        left: event.clientX - current.offsetX,
        top: event.clientY - current.offsetY,
        width: current.width,
        height: current.height,
        over: isOverSlot(event.clientX, event.clientY),
      })
    },
    onPointerUp: (event: PointerEvent<HTMLButtonElement>) => {
      const current = session.current
      if (!current || current.pointerId !== event.pointerId) return
      if (current.active) {
        // The browser still fires a click after a drag; it must not place the word.
        // Touch drags fire no click at all, so the flag also clears itself; otherwise it
        // would swallow the next keyboard activation.
        suppressClick.current = true
        window.setTimeout(() => {
          suppressClick.current = false
        }, 250)
        if (isOverSlot(event.clientX, event.clientY)) onDrop(current.word)
      }
      endDrag()
    },
    onPointerCancel: endDrag,
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      if (suppressClick.current) {
        suppressClick.current = false
        event.preventDefault()
        return
      }
      if (enabled) onActivate(word)
    },
  })

  return { slotRef, ghost, chipProps }
}
