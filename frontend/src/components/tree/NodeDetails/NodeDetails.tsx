import React, { memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './NodeDetails.module.css';

interface NodeDetailsProps {
  nodeId: string;
  className?: string;
  onSelect: (nodeId: string | undefined) => void;
  onHover?: (nodeId: string) => void;
  onClear?: () => void;
}

export const NodeDetails = memo(
  function NodeDetails({ nodeId, className, ...props }: NodeDetailsProps) {
    const closeHandler = useCallback(() => props.onSelect(undefined), [props]);

    return (
      <section className={classNames(css.root, className)}>
        <header className={css.header}>
          <h3 className={css.title}>id: {nodeId}</h3>
            <div className={css.headerButtons}>
                <button className={css.headerButton} onClick={closeHandler}>&#9998;</button> {/*TODO: add data modify modal*/}
                <button className={css.headerButton} onClick={closeHandler}>&#10008;</button>
            </div>
        </header>
          <div>
              <p>Imię: {}</p>
              <p>Drugie imię: {}</p>
              <p>Nazwisko: {}</p>
              <p>Nazwisko rodowe: {}</p>
              <p>Data urodzenia: {}</p>
              <p>Data śmierci: {}</p>
              <p>Opis: {}</p>
              <div>
                  <p>Załączniki: {}</p>
              </div>

          </div>
      </section>
    );
  },
);
