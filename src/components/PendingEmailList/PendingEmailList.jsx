
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// function PendingEmailList({ entries, onRemove }) {
//   return (
//     <ul className="space-y-4 w-full max-h-[240px] overflow-y-auto pr-1">
//       <AnimatePresence>
//         {entries.map(entry => (
//           <motion.li
//             key={entry.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="flex justify-between items-start p-3 bg-white rounded-lg shadow text-sm"
//           >
//             <div className="space-y-1">
//               <p><strong>Nome do cliente:</strong> {entry.nome}</p>
//               <p><strong>Número do caso:</strong> {entry.numeroCaso}</p>
//               <p><strong>E-mail:</strong> {entry.destinatario}</p>
//             </div>
//             <button
//               onClick={() => onRemove(entry.id)}
//               className="text-red-600 font-bold hover:text-red-800 ml-4"
//             >
//               X
//             </button>
//           </motion.li>
//         ))}
//       </AnimatePresence>
//     </ul>
//   );
// }

// export default PendingEmailList;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function PendingEmailList({ entries, onRemove }) {
  return (
    <ul className="space-y-4 w-full pr-1">
      <AnimatePresence>
        {entries.map(entry => (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex justify-between items-start p-3 bg-white rounded-lg shadow text-sm"
          >
            <div className="space-y-1">
              <p><strong>Nome do cliente:</strong> {entry.nome}</p>
              <p><strong>Número do caso:</strong> {entry.numeroCaso}</p>
              <p><strong>E-mail:</strong> {entry.destinatario}</p>
            </div>
            <button
              onClick={() => onRemove(entry.id)}
              className="text-red-600 font-bold hover:text-red-800 ml-4"
            >
              X
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default PendingEmailList;
