from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Моковые данные казино
casinos_data = [
    {
        'id': 1,
        'name': 'Golden Wins Casino',
        'description': 'Golden Wins Casino - это ведущее онлайн казино с огромным выбором слотов, настольных игр и живых дилеров. Мы предлагаем щедрые бонусы и промокоды для новых и постоянных игроков.',
        'rating': 4.8,
        'website': 'https://example.com',
        'license': 'Curacao Gaming License #123456',
        'gamesCount': 3000,
        'withdrawalTime': '1-3 дня',
        'paymentMethods': ['Visa', 'Mastercard', 'PayPal', 'Bitcoin', 'Skrill'],
        'categories': ['Slots', 'Roulette', 'Blackjack'],
        'platforms': ['CS2', 'Dota2'],
        'bonuses': [
            {
                'id': 'b1',
                'code': 'GOLD100',
                'description': 'Бонус 100% на первый депозит до 10000 рублей',
                'type': 'deposit_match',
                'expiration': '2026-06-30',
                'wageringRequirements': 35,
                'minimumDeposit': 1000
            },
            {
                'id': 'b2',
                'code': 'FREESPIN50',
                'description': '50 бесплатных спинов без депозита',
                'type': 'free_spins',
                'expiration': '2026-03-15'
            }
        ]
    },
    {
        'id': 2,
        'name': 'Lucky Stars Casino',
        'description': 'Lucky Stars Casino предлагает ежедневные турниры, эксклюзивные предложения и лучшие условия для игры. Наша платформа обеспечивает безопасность и честность игрового процесса.',
        'rating': 4.6,
        'website': 'https://example.com',
        'license': 'Malta Gaming Authority License #MGA/ABC/123/2020',
        'gamesCount': 2500,
        'withdrawalTime': '24 часа',
        'paymentMethods': ['Visa', 'Mastercard', 'Neteller', 'Bitcoin'],
        'categories': ['Crash', 'Slots', 'Poker'],
        'platforms': ['Rust', 'USD/RUB/Crypto'],
        'bonuses': [
            {
                'id': 'b3',
                'code': 'LUCKY20',
                'description': 'Кэшбэк 20% на проигранные ставки',
                'type': 'cashback',
                'expiration': '2026-05-20',
                'wageringRequirements': 20
            }
        ]
    },
    {
        'id': 3,
        'name': 'Royal Jackpot Casino',
        'description': 'Royal Jackpot Casino - премиум казино с VIP программой, высокими лимитами вывода и персональным менеджером для каждого клиента.',
        'rating': 4.9,
        'website': 'https://example.com',
        'license': 'UK Gambling Commission License #000-12345-RoyalJackpot',
        'gamesCount': 4000,
        'withdrawalTime': '1 день',
        'paymentMethods': ['Visa', 'Mastercard', 'PayPal', 'Bitcoin', 'Skrill', 'Trustly'],
        'categories': ['Slots', 'Roulette', 'Live Casino'],
        'platforms': ['CS2', 'Dota2'],
        'bonuses': [
            {
                'id': 'b4',
                'code': 'ROYAL300',
                'description': 'Бонус 300% на первый депозит до 30000 рублей',
                'type': 'deposit_match',
                'expiration': '2026-04-10',
                'wageringRequirements': 40,
                'minimumDeposit': 2000
            },
            {
                'id': 'b5',
                'code': 'VIP1000',
                'description': '1000 фриспинов для новых VIP клиентов',
                'type': 'free_spins',
                'expiration': '2026-07-01'
            }
        ]
    },
    {
        'id': 4,
        'name': 'Diamond Fortune Casino',
        'description': 'Diamond Fortune Casino - новое поколение онлайн казино с инновационными играми и уникальными бонусными предложениями.',
        'rating': 4.5,
        'website': 'https://example.com',
        'license': 'Gibraltar Gambling License #GBC-12345',
        'gamesCount': 2000,
        'withdrawalTime': '1-2 дня',
        'paymentMethods': ['Visa', 'Mastercard', 'Skrill', 'Neteller', 'EcoPayz'],
        'categories': ['Crash', 'Roulette', 'Slots'],
        'platforms': ['Rust', 'USD/RUB/Crypto'],
        'bonuses': [
            {
                'id': 'b6',
                'code': 'DIAMOND50',
                'description': 'Бонус 50% на первый депозит + 50 фриспинов',
                'type': 'deposit_match',
                'expiration': '2026-08-15',
                'wageringRequirements': 30,
                'minimumDeposit': 1500
            }
        ]
    },
    {
        'id': 5,
        'name': 'Ocean Paradise Casino',
        'description': 'Ocean Paradise Casino - подводное приключение с лучшими слотами и эксклюзивными турнирами.',
        'rating': 4.7,
        'website': 'https://example.com',
        'license': 'Alderney Gambling License #AGL-54321',
        'gamesCount': 3500,
        'withdrawalTime': '2-3 дня',
        'paymentMethods': ['Visa', 'Mastercard', 'PayPal', 'Bitcoin', 'Skrill', 'MuchBetter'],
        'categories': ['Slots', 'Blackjack', 'Poker'],
        'platforms': ['CS2', 'Dota2'],
        'bonuses': [
            {
                'id': 'b7',
                'code': 'OCEAN200',
                'description': 'Бонус 200% на первый депозит до 20000 рублей',
                'type': 'deposit_match',
                'expiration': '2026-09-30',
                'wageringRequirements': 45,
                'minimumDeposit': 2500
            },
            {
                'id': 'b8',
                'code': 'TROPICAL100',
                'description': '100 фриспинов на популярные слоты',
                'type': 'free_spins',
                'expiration': '2026-05-01'
            }
        ]
    },
    {
        'id': 6,
        'name': 'Arctic Spin Casino',
        'description': 'Arctic Spin Casino - холодные ветра севера принесли щедрые бонусы и горячие игры.',
        'rating': 4.4,
        'website': 'https://example.com',
        'license': 'Curacao Gaming License #CG-98765',
        'gamesCount': 2800,
        'withdrawalTime': '24-48 часов',
        'paymentMethods': ['Visa', 'Mastercard', 'PaySafeCard', 'Bitcoin'],
        'categories': ['Crash', 'Slots', 'Baccarat'],
        'platforms': ['Rust', 'USD/RUB/Crypto'],
        'bonuses': [
            {
                'id': 'b9',
                'code': 'ARCTIC30',
                'description': 'Еженедельный кэшбэк 30% на проигрыши',
                'type': 'cashback',
                'expiration': '2026-12-31',
                'wageringRequirements': 25
            }
        ]
    }
]

@app.route('/')
def index():
    # Получаем параметры из запроса
    category = request.args.get('category')
    platform = request.args.get('platform')
    search_query = request.args.get('search', '')

    # Фильтруем казино по платформе, если она указана
    filtered_casinos = casinos_data
    if platform and platform != 'All':
        filtered_casinos = [casino for casino in filtered_casinos if platform in casino.get('platforms', [])]

    # Фильтруем казино по категории, если она указана
    if category and category != 'All':
        filtered_casinos = [casino for casino in filtered_casinos if category in casino.get('categories', [])]

    # Фильтруем по поисковому запросу, если он есть
    if search_query:
        search_query_lower = search_query.lower()
        filtered_casinos = [
            casino for casino in filtered_casinos
            if search_query_lower in casino['name'].lower() or
               search_query_lower in casino['description'].lower() or
               any(search_query_lower in cat.lower() for cat in casino.get('categories', [])) or
               any(search_query_lower in plat.lower() for plat in casino.get('platforms', []))
        ]

    # Получаем все уникальные категории и платформы
    all_categories = set()
    all_platforms = set()
    for casino in casinos_data:
        for cat in casino.get('categories', []):
            all_categories.add(cat)
        for plat in casino.get('platforms', []):
            all_platforms.add(plat)
    
    all_categories = sorted(list(all_categories))
    all_platforms = sorted(list(all_platforms))

    return render_template(
        'index.html', 
        casinos=filtered_casinos, 
        categories=all_categories, 
        platforms=all_platforms,
        selected_category=category,
        selected_platform=platform,
        search_query=search_query
    )

@app.route('/platform/<platform>')
def platform_page(platform):
    # Получаем параметры из запроса
    category = request.args.get('category')
    search_query = request.args.get('search', '')

    # Фильтруем казино по выбранной платформе
    filtered_casinos = [casino for casino in casinos_data if platform in casino.get('platforms', [])]

    # Фильтруем казино по категории, если она указана
    if category and category != 'All':
        filtered_casinos = [casino for casino in filtered_casinos if category in casino.get('categories', [])]

    # Фильтруем по поисковому запросу, если он есть
    if search_query:
        search_query_lower = search_query.lower()
        filtered_casinos = [
            casino for casino in filtered_casinos
            if search_query_lower in casino['name'].lower() or
               search_query_lower in casino['description'].lower() or
               any(search_query_lower in cat.lower() for cat in casino.get('categories', []))
        ]

    # Получаем все уникальные категории для данной платформы
    all_categories = set()
    for casino in filtered_casinos:
        for cat in casino.get('categories', []):
            all_categories.add(cat)
    all_categories = sorted(list(all_categories))

    return render_template(
        'platform.html', 
        casinos=filtered_casinos, 
        categories=all_categories, 
        selected_category=category,
        selected_platform=platform,
        search_query=search_query
    )

@app.route('/casino/<int:casino_id>')
def casino_detail(casino_id):
    casino = next((c for c in casinos_data if c['id'] == casino_id), None)
    if not casino:
        return "Казино не найдено", 404

    return render_template('casino_detail.html', casino=casino)

@app.route('/api/toggle_theme', methods=['POST'])
def toggle_theme():
    # Эндпоинт для переключения темы (в реальной реализации сохранение в сессии или куках)
    theme = request.json.get('theme', 'light')
    # Здесь можно сохранить тему в сессии или куки
    return jsonify({'success': True, 'theme': theme})

if __name__ == '__main__':
    app.run(debug=True)