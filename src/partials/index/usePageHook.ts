import { useContext, useEffect, useMemo, useState } from 'react';
import { parseDecimals } from '@/components/scripts/helpers';
import { fetchPost } from '@/scripts/helpers/fetchHelper';
import { useIsClient, useLocalStorage } from 'usehooks-ts';
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper';
import { AppContext } from '@/scripts/contexts/AppContext';
import { useSession } from 'next-auth/react';

const usePageLogic = ({ online, tokens, serverSession }) => {
  const app = useContext(AppContext);
  const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol=";
  const isClient = useIsClient();
  const [q__btcPrice, btcPrice] = useQueryPlus({
    queryKey: ['btcData'],
    refetchOnWindowFocus: false,
    retry: 1,
    queryFn: async () => {
      const priceRes = await fetch(API_PRICE_BASEURL + "BTCUSDT");
      const price = await priceRes.json();
      return price.price;
    },
  }, []);

  const [clientIP, s__clientIP] = useState('');
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "");
  const [rpi, s__rpi] = useState("");

  const getData = async (newuid) => {
    try {
      const res = await fetchPost('/api/start', {
        name: newuid.split(":")[0],
        secret: newuid.split(":")[1],
        ...sessiondata
      });

      if (res.status <= 400 && res.status >= 200) {
        console.log("res", res);
        console.log("await res.json()", await res.json());
      } else {
        return alert("ERROR");
      }

      s__clientIP(newuid);
      let new_uid = newuid;
      s__rpi(new_uid);
      s__LS_rpi(new_uid);

      app.alert("success", "Simulated Player Registered succesfully!");
    } catch (e) {
      console.log("coudlnt register Simulated Player");
    }
  };

  const loginData = async (newuid) => {
    try {
      const res = await fetch(
        `/api/start?name=${newuid.split(":")[0]}&secret=${newuid.split(":")[1]}`
      );

      if (res.status <= 400 && res.status >= 200) {
        console.log("res", res);
        console.log("await res.json()", await res.json());
      } else {
        return alert("ERROR");
      }

      s__clientIP(newuid);
      let new_uid = newuid;
      s__rpi(new_uid);
      s__LS_rpi(new_uid);

      app.alert("success", "Simulated Player logged in succesfully!");
    } catch (e) {
      console.log("coudlnt log into Simulated Player");
    }
  };

  const registerWithRandom = () => {
    let username = !sessiondata ? ("user") : sessiondata.user.email;

    let randomThousand = parseInt(`${Math.random() * 9000 + 1000}`);
    let numberaccount = prompt(
      `Would you like to create a Simulated Player -> (${username}:${randomThousand})? \n\n\n Account Name: <${username}> \n Secret Key Code: ${randomThousand} \n\n\n Remember to save your credentials \n You can use the *Secret Key Code* to recover your account! `,
      `${randomThousand}`
    );
    if (!numberaccount) {
      return;
    }
    if (parseInt(numberaccount) < 10000) {
      return;
    }

    if (numberaccount) {
      getData(`${username}:` + numberaccount);
    }
  };

  const loginToAccount = () => {
    let username = !sessiondata ? ("user") : sessiondata.user.email;

    let numberaccount = prompt(
      `Would you like to create a Simulated Player -> (${username}:????})? \n\n\n Account Name: 
            <${username}> \n Secret Key Code: ???? \n\n\n Remember to save your credentials \n You can use the *Secret Key Code* to recover your account! `,
      ``
    );
    if (!numberaccount) {
      return;
    }
    if (parseInt(numberaccount) >= 10000) {
      return;
    }

    if (numberaccount) {
      loginData(`${username}:` + numberaccount);
    }
  };

  const { data: sessiondata } = useSession();

  useEffect(() => {
    s__rpi(LS_rpi);
    if (!!LS_rpi) {
      s__clientIP(LS_rpi.split(":")[0]);
    }
    app.s__sidebarLinks([]);
    app.s__sidebarPages([
      { id: 2, label: "Web Byte City", url: "https://bytc.vercel.app/", icon: "bingo" },
      ...(!LS_rpi ? [] : [
        { id: 0, label: "History", url: "/trade/history/?pair=BTCUSDT", icon: "agreements" },
        { id: 2, label: "Dashboard", url: "/chart/4h?token=btc", icon: "chart" }
      ]),
    ]);
  }, []);

  return {
    q__btcPrice,
    inventoryItems: useMemo(() => {
      const _inventoryItems = [
        { companyName: "Strategy A",  totalValue: parseDecimals(btcPrice) },
        // { companyName: "Company B", unitsArray: [4, 5, 6], totalValue: "20,000" },
      ];
      return _inventoryItems;
    }, [q__btcPrice]),
    clientIP,
    LS_rpi,
    rpi,
    registerWithRandom,
    loginToAccount,
    sessiondata,
  };
};

export default usePageLogic;
