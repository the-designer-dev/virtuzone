import { useState, createContext } from 'react';

export const CompanyContext = createContext({});

export function CompanyProvider({ children }) {
  const [Company, setCompany] = useState('');

  return (
    <CompanyContext.Provider value={{ Company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}
