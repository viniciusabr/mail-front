import React from 'react';

function PendingEmailList({ entries, onRemove, onSendAll, isSending, styles }) {
  return (
    <div style={styles.pendingListContainer}>
      <h3 style={styles.pendingListTitle}>E-mails a Enviar ({entries.length})</h3>

      <ul style={styles.pendingList}>
        {entries.map(entry => (
          <li key={entry.id} style={styles.pendingListItem}>
            <div style={styles.pendingItemWrapper}>
              <div style={styles.pendingItemText}>
                <span><strong>Nome do cliente:</strong> {entry.nome}</span>
                <span><strong>Número do caso:</strong> {entry.numeroCaso}</span>
                <span><strong>E-mail:</strong> {entry.destinatario}</span>
              </div>
              <button
                onClick={() => onRemove(entry.id)}
                style={styles.removePendingButton}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={onSendAll}
        style={styles.sendAllButton}
        disabled={isSending}
      >
        {isSending ? 'Enviando...' : 'Enviar Todos os E-mails'}
      </button>
    </div>
  );
}

export default PendingEmailList;
