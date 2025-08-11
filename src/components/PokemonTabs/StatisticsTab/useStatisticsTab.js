import { useMemo, useState } from 'react';

const useStatisticsTab = ({ pokeInfo }) => {
  const [display, setDisplay] = useState(() => {
    const saved = localStorage.getItem('statsDisplay');
    return saved ? JSON.parse(saved) : true;
  });

  const handleDisplayChange = (e, newDisplay) => {
    if (newDisplay === null) return;
    setDisplay(newDisplay);
    localStorage.setItem('statsDisplay', JSON.stringify(newDisplay));
  };

  const IV = 31;
  const EV = 252;
  const NATURE_MULT = 1;

  function calculateStat(base, level, isHp = false) {
    if (isHp) {
      return Math.floor(
        ((2 * base + IV + Math.floor(EV / 4)) * level) / 100 + level + 10,
      );
    } else {
      return Math.floor(
        (Math.floor(((2 * base + IV + Math.floor(EV / 4)) * level) / 100) + 5) *
          NATURE_MULT,
      );
    }
  }

  const statistics = useMemo(() => {
    if (!pokeInfo?.stats) {
      return [];
    }

    return pokeInfo.stats.map((statObj) => ({
      stat: statObj?.stat?.name,
      base_stat: statObj?.base_stat,
      stat_50: calculateStat(
        statObj?.base_stat,
        50,
        statObj?.stat?.name === 'hp',
      ),
      stat_100: calculateStat(
        statObj?.base_stat,
        100,
        statObj?.stat?.name === 'hp',
      ),
    }));
  }, [pokeInfo]);

  return {
    display,
    handleDisplayChange,
    statistics,
  };
};

export default useStatisticsTab;
