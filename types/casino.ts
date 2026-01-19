// Тип для промокода/бонуса
export interface Bonus {
  id: string;
  code: string;
  description: string;
  type: 'deposit_match' | 'free_spins' | 'cashback' | 'no_deposit' | 'reload_bonus';
  expiration: string; // дата в формате YYYY-MM-DD
  wageringRequirements?: number; // требования по отыгрышу
  minimumDeposit?: number; // минимальный депозит
}

// Тип для категории игры
export type GameCategory = 'Crash' | 'Roulette' | 'Slots' | 'Blackjack' | 'Poker' | 'Baccarat' | 'Live Casino';

// Тип для казино
export interface Casino {
  id: string;
  name: string;
  description: string;
  rating: number; // рейтинг от 0 до 5
  bonuses: Bonus[];
  license?: string; // лицензия
  website: string; // официальный сайт
  gamesCount?: number; // количество игр
  withdrawalTime?: string; // время вывода средств
  paymentMethods?: string[]; // методы оплаты
  image?: string; // URL изображения казино
  categories?: GameCategory[]; // категории игр, доступные в казино
}