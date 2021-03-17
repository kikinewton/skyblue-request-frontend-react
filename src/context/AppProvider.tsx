import React, { createContext, FC, useState } from 'react'
import { AppContextState } from '../types/types'
import { appPages, DARK_THEME_MODE, LIGHT_THEME_MODE } from '../utils/constants'

const contextDefaultValues: AppContextState = {
  currentPage: appPages.dashboardPage,
  theme: DARK_THEME_MODE,
  updateCurrentPage: () => {},
  updateTheme: () => {}
}


export const AppContext = createContext<AppContextState> (
  contextDefaultValues
)


const AppProvider: FC = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>(contextDefaultValues.currentPage);
  const [theme, setTheme] = useState<string>(contextDefaultValues.theme);

  const updateCurrentPage = (pageVal: string) => setCurrentPage((currentPage) => pageVal)
  const updateTheme = (themeVal: string) => setTheme((theme)=> themeVal)

  return (
    <AppContext.Provider
      value={{
        theme,
        currentPage,
        updateCurrentPage,
        updateTheme
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider