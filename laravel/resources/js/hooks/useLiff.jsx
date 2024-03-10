import { useState, useEffect } from 'react';
import liff from '@line/liff';

const liffId = import.meta.env.VITE_LIFF_ID;

function useLiff() {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const initLiff = async () => {
    setLoading(true);
    try {
      if (liff) {
        await liff.init({ liffId });
        console.log('success liff init');
        setReady(true);
      } else {
        throw new Error('liff is undefined');
      }
    } catch (error) {
      console.log({ error });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async ({ text }) => {
    setLoading(true);
    try {
      liff.sendMessages([{ type: 'text', text }]);
      console.log(`success send message: ${text}`);
    } catch (error) {
      console.log({ error });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initLiff();
  }, []);

  return { loading, ready, error, sendMessage };
}

export default useLiff;
