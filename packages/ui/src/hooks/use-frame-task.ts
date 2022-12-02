import { onBeforeUnmount } from 'vue'
import { frameTo, type FrameTask, type FrameOption } from '../helpers'

export function useFrameTask() {
  let task: FrameTask | null = null

  function frameStop() {
    task && task.stop()
    task = null
  }

  function frameStart(options: FrameOption) {
    frameStop()

    task = frameTo(options)
  }

  function getRunFrameTaskId() {
    return task?.id ?? null
  }

  onBeforeUnmount(frameStop)

  return { frameStart, frameStop, getRunFrameTaskId }
}
