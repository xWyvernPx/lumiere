/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOCKING_LOGIN: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
