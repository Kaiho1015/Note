import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  // Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] =
  [
    {
      title: "To Support Me",
      // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
      description: (
        <>
          Give me a star at{" "}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/QHP1015'
          >
            GitHub
          </a>
        </>
      ),
    },
    {
      title:
        "Learn More About Me",
      // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
      description: (
        <>
          To my{" "}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://qhp.us'
          >
            blog
          </a>
          <br />
          To my other{" "}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://note.qhp.us'
          >
            website
          </a>
        </>
      ),
    },
    {
      title: "Contact Me",
      // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
      description: (
        <>
          Wechat: Qianhpeng
          <br />
          Email:
          2439462872@qq.com
        </>
      ),
    },
  ];

// function Feature({title, Svg, description}: FeatureItem) {
function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
