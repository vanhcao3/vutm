import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      // title={title ? `${title} | Bulletproof React` : undefined}
      title={title ? `${title}` : undefined}
      defaultTitle="Application Name"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
