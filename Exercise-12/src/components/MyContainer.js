import React from 'react';
import { useTranslation } from 'react-i18next';

function MyContainer() { 
  const { t } = useTranslation();

  return (
    <div>
      <p>{t('frontPage')}</p>
    </div>
  );
}

export default MyContainer;
