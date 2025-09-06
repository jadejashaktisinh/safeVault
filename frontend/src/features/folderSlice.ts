
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Folder, Note } from "../types"

interface FolderState {
  folders: Folder[]  
}

const initialState: FolderState = {
  folders: [],
}

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload
    },
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload)
    },
    addNoteToFolder: (
      state,
      action: PayloadAction<{ folderId: string; note: Note }>
    ) => {
      const findAndInsert = (folders: Folder[]) => {
        for (let folder of folders) {
          if (folder._id === action.payload.folderId) {
            folder.notes.push(action.payload.note)
            return true
          }
          if (findAndInsert(folder.folders)) return true
        }
        return false
      }
      findAndInsert(state.folders)
    },
    addSubFolder: (
      state,
      action: PayloadAction<{ parentId: string; folder: Folder }>
    ) => {
      const findAndInsert = (folders: Folder[]) => {
        for (let folder of folders) {
          if (folder._id === action.payload.parentId) {
            folder.folders.push(action.payload.folder)
            return true
          }
          if (findAndInsert(folder.folders)) return true
        }
        return false
      }
      findAndInsert(state.folders)
    },
  },
})

export const { setFolders, addFolder, addNoteToFolder, addSubFolder } =
  folderSlice.actions

export default folderSlice.reducer
