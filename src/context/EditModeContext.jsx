import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { cmsAuthAdapter } from '@/lib/cms/auth';

const EditModeContext = createContext({
  isAdmin: false,
  isEditing: false,
  showOutlines: false,
  setIsEditing: () => {},
  setShowOutlines: () => {}
});

const getEditQueryValue = (router) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const queryValue = router?.query?.edit;
  if (typeof queryValue === 'string') {
    return queryValue === 'true';
  }

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('edit') === 'true';
};

const getAdminQueryValue = (router) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const queryValue = router?.query?.admin;
  if (typeof queryValue === 'string') {
    return queryValue === 'true';
  }

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('admin') === 'true';
};

export const EditModeProvider = ({ children }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showOutlines, setShowOutlines] = useState(false);

  useEffect(() => {
    const shouldBootstrapAdmin = getAdminQueryValue(router);

    if (shouldBootstrapAdmin) {
      cmsAuthAdapter.setIsAdmin(true);
    }

    const admin = cmsAuthAdapter.getIsAdmin();
    const editingFromQuery = getEditQueryValue(router);
    const editingEnabled = admin && editingFromQuery;

    setIsAdmin(admin);
    setIsEditing(editingEnabled);
    setShowOutlines(editingEnabled);
  }, [router]);

  const contextValue = useMemo(() => ({
    isAdmin,
    isEditing,
    showOutlines,
    setIsEditing,
    setShowOutlines
  }), [isAdmin, isEditing, showOutlines]);

  return <EditModeContext.Provider value={contextValue}>{children}</EditModeContext.Provider>;
};

export const useEditMode = () => useContext(EditModeContext);
