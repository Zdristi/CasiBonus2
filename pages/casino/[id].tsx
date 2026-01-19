import { GetServerSideProps } from 'next';
import { Casino } from '@/types/casino';
import { mockCasinos } from '@/data/casinos';
import { useRouter } from 'next/router';
import ThemeToggle from '@/components/ThemeToggle';

interface CasinoPageProps {
  casino: Casino;
}

// Компонент для отображения информации о промокоде
const BonusCard = ({ bonus }: { bonus: any }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-lg p-6 mb-4 border border-blue-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center mb-2 gap-2">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
              {bonus.type.replace('_', ' ').toUpperCase()}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Срок действия: {new Date(bonus.expiration).toLocaleDateString('ru-RU')}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{bonus.code}</h3>
          <p className="text-gray-700 dark:text-gray-300">{bonus.description}</p>

          {bonus.wageringRequirements && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Отработка: x{bonus.wageringRequirements}
            </p>
          )}
          {bonus.minimumDeposit && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Мин. депозит: {bonus.minimumDeposit} руб
            </p>
          )}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(bonus.code);
            alert('Промокод скопирован!');
          }}
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 w-full sm:w-auto"
        >
          Копировать код
        </button>
      </div>
    </div>
  );
};

// Страница конкретного казино
export default function CasinoPage({ casino }: CasinoPageProps) {
  if (!casino) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Казино не найдено</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-4">Пожалуйста, вернитесь на главную страницу</p>
          <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">← Вернуться на главную</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <a href="/" className="inline-flex items-center text-blue-600 hover:underline">
            ← Вернуться к списку казино
          </a>
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Шапка казино */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{casino.name}</h1>
                <div className="mt-2 flex items-center justify-center sm:justify-start">
                  <span className="text-yellow-300 mr-1">★</span>
                  <span className="text-lg font-semibold">{casino.rating}</span>
                  <span className="mx-3 hidden sm:inline">•</span>
                  <span className="text-blue-200">{casino.bonuses.length} активных бонусов</span>
                </div>
              </div>
            </div>
          </div>

          {/* Основной контент */}
          <div className="p-4 sm:p-8">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Описание казино</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{casino.description}</p>

                {/* Отображение категорий */}
                {casino.categories && casino.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Категории игр</h3>
                    <div className="flex flex-wrap gap-2">
                      {casino.categories.map((category, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900 dark:text-blue-100"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Доступные промокоды</h2>
                {casino.bonuses.length > 0 ? (
                  <div>
                    {casino.bonuses.map((bonus) => (
                      <BonusCard key={bonus.id} bonus={bonus} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">В настоящее время нет активных промокодов</p>
                )}
              </div>

              <div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Информация о казино</h3>

                  <div className="space-y-4">
                    {casino.license && (
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Лицензия:</h4>
                        <p className="text-gray-700 dark:text-gray-300">{casino.license}</p>
                      </div>
                    )}

                    {casino.gamesCount && (
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Количество игр:</h4>
                        <p className="text-gray-700 dark:text-gray-300">{casino.gamesCount}</p>
                      </div>
                    )}

                    {casino.withdrawalTime && (
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Время вывода:</h4>
                        <p className="text-gray-700 dark:text-gray-300">{casino.withdrawalTime}</p>
                      </div>
                    )}

                    {casino.paymentMethods && casino.paymentMethods.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Методы оплаты:</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {casino.paymentMethods.map((method, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <a
                        href={casino.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                      >
                        Перейти на сайт казино
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Получение данных на сервере
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // В реальном приложении здесь будет запрос к API для получения данных казино
  // Пример данных для демонстрации
  const casinoId = params?.id as string;

  // Найти казино в моковых данных
  const casino = mockCasinos.find(c => c.id === casinoId);

  if (!casino) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      casino,
    },
  };
};