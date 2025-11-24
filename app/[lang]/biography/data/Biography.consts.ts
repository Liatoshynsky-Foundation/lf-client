import { BiographyContentBlock, ContentType, ImagesSizes } from '~/types/page/biography.types';

import { boldText, makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

export const biographyContentData: BiographyContentBlock[] = [
  {
    yearTitle: undefined,
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('3 січня 1895 року '),
                normalText('(22 грудня 1894 року за старим стилем) — у Житомирі народився Борис Лятошинський.')
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1904-06 '), normalText('— навчання у Першій київській гімназії.')]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1906-08 '), normalText('— навчання у Немирівській чоловічій гімназії.')]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1908-11 '), normalText('— навчання у Златопільській чоловічій гімназії.')]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      }
    ]
  },
  {
    yearTitle: '1910',
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1910 '),
                normalText('— написання перших творів для фортепіано ('),
                boldText('Мазурка'),
                normalText(' i '),
                boldText('Вальс'),
                normalText(').')
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Якраз у роки свого навчання в Златопільській гімназії я почав по-справжньому цікавитися музикою. 
                Спершу я почав навчатися грати на скрипці у тамтешнього викладача гімназії Бенціона Симоновича Хаїмовського, 
                причому грав потім в учнівському оркестрі.., яким керував той же Б. Хаїмовський, а згодом, на початку 1910 року, 
                я почав пробувати творити, перебуваючи… у V класі гімназії. Таким чином, перші композиторські, дуже, звичайно, 
                незрілі спроби відносяться саме до періоду златопільського життя.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського, 21.01.1959. Київ')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([boldText('1911-13 '), normalText('— навчання у Другій житомирській гімназії.')]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1913-18 '),
                normalText('— навчання в Імператорському університеті Св. Володимира в Києві, юридичний факультет.')
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Я вже казав, що записався ще на два іспити. 
                Обидві книжки я вже купив. Дуже великі і жахливо 
                гидкі книжки. Особливо римське право. Такої гидоти 
                я ще ніколи в житті не бачив! Ох уже ці римляни!`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 5 травня 1916. Саратов')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: {
          src: '/images/liatoshynsky-1910.png',
          size: ImagesSizes.BigHorizontal,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1910-ті роки')]),
            en: makeDoc([normalText('')])
          }
        },
        additionalImage: {
          src: '/images/boris-tsarevich-1914.png',
          size: ImagesSizes.SmallVerticalThin,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. Автор Борис Царевич (брат дружини). Близько 1914-го року')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([boldText('1914 '), normalText('— приватне студіювання композиції у Рейнгольда Глієра.')]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1914-19 '),
                normalText(
                  '— навчання в Київській консерваторії за спеціальністю «композиція», клас Рейнгольда Глієра.'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Восени 1914 року я вступив до Київської консерваторії в клас композиції Р. М. 
                Глієра <…> Із нами, своїми учнями у Київській консерваторії, Рейнгольд Моріцевич 
                займався всіма музично-теоретичними дисциплінами, тобто гармонією, поліфонією, 
                оркестровкою, формою і композицією. Учнів у Рейнгольда Моріцевича було небагато, 
                всього людей дев’ять-десять. <…> Зустрічалися ми з Рейнгольдом Моріцевичем два 
                рази на тиждень, по вівторках і п’ятницях надвечір, незалежно від того, хто і на 
                якому курсі перебував. Зазвичай всі ми просиджували в класі від початку і до кінця 
                занять, поки не йшов, позаймавшись із Рейнгольдом Моріцевичем, останній із нас.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Борис Лятошинський, спогади про Глієра, 1965')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([boldText('1917 '), normalText('— вінчання з Маргаритою Царевич.')]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Ах, мила, милий мій котику, коли ж нарешті прийде той час, коли ми будемо разом із тобою,
                 у вітальні, де так гарно, стоїть рояль і багато нот.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 4 травня 1916. Саратов')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: {
          src: '/images/tetiana-gomon.png',
          size: ImagesSizes.BigHorizontal,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Тетяна Гомон та команда Фонду Лятошинського. 1910-ті роки')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1917-19 '),
                normalText(
                  `— викладання: Музично-драматичні курси А. Тальновського, 
                приватна музична школа Якобі-Павлович, літні курси Київської консерваторії.`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      }
    ]
  },
  {
    yearTitle: '1920',
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([boldText('від 1920 '), normalText('— член професійної спілки робітників мистецтва.')]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1920-1941 і 1944-1968 '),
                normalText(
                  `— викладання циклу музично-теоретичних дисциплін і ведення класу композиції й оркестрування в Київській державній 
                консерваторії (нині: Національна музична академія України). Від 1924 до 1934 року Консерваторія змінювала свій статус
                 на Музичний технікум, ставала частиною Музично-драматичного інституту імені Миколи Лисенка, врешті повернувшись до свого 
                 початкового статусу і назви.
                 `
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Між іншим, хочу вам сказати про дуже приємну для мене новину, а саме: з цього року 
                мені дали в консерваторії свій клас спеціальної теорії (гармонія і контрапункт). 
                Уже маю близько 15-ти учнів. Я, звісно, дуже радий цьому: у всякому разі, це зовсім не те,
                що нещасні обов’язкові предмети.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Рейнгольду Глієру, листопад–грудень, 1922. Київ')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: {
          src: '/images/liatoshynsky-1920.png',
          size: ImagesSizes.SmallVerticalWide,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1920-ті роки')]),
            en: makeDoc([normalText('')])
          }
        },
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1926 '),
                normalText(
                  '— Лятошинський стає членом Асоціації сучасної музики, створеної про київській філії «Музичного товариства імені М. Д. Леонтовича».'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1913-18 '),
                normalText('— навчання в Імператорському університеті Св. Володимира в Києві, юридичний факультет.')
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Останнім часом я чув по радіо багато нової музики: Шенберґа, Шрекера, Корнгольда та інших композиторів, 
                мабуть, із молодих. У Німеччині такі виступи відбуваються досить часто, і їм надають, вочевидь, великого значення. 
                Нещодавно Шрекер сам диригував своєю останньою річчю — Сюїтою для камерного оркестру, написаною спеціально для Бреславльського радіо і присвяченою йому.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 24 січня 1929. Київ')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([boldText('1928 '), normalText('— член «Всеукраїнського об’єднання пролетарських музик».')]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      }
    ]
  },
  {
    yearTitle: '1930',
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1931 '),
                normalText(
                  `— початок роботи на Київській кіностудії (нині: Національна кіностудія художніх фільмів
                   імені Олександра Довженка), музика до фільму «Кармелюк», режисер Фавст Лопатинський.`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1932 '),
                normalText(
                  `— початок співпраці з Театром російської драми (нині: Національний академічний драматичний театр імені Лесі Українки). 
                  Музика до постановки п’єси Всеволода Вишневського «Оптимістична трагедія», режисер Володимир Неллі (партитура не збереглася).`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1935 '),
                normalText('— присвоєно вчена звання професора за спеціальністю «Теорія музики і композиція».')
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1935-38 '),
                normalText(
                  '— за сумісництвом професор композиції й оркестрування Московської державної консерваторії (РРСР).'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1936-37 '),
                normalText(
                  `— етап гострої критики творів Лятошинського, звинувачення у формалізмі на тлі загальнорадянської кампанії, 
                  розпочатої у Москві нападами на балет «Світлий струмок» і оперу «Леді Макбет Мценського повіту» Дмітрія Шостаковича, 
                  оприлюдненими у редакційних статтях газети «Правда», що були передруковані й українською пресою. 
                  Критиці піддавалися твори Лятошинського 1920-х років і опера «Золотий обруч» (ор. 23, 1929 рік).`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: {
          src: '/images/liatoshynsky-1930.png',
          size: ImagesSizes.BigHorizontal,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1930-ті роки')]),
            en: makeDoc([normalText('')])
          }
        },
        additionalImage: {
          src: '/images/liatoshynsky-application.png',
          size: ImagesSizes.SmallVerticalThin,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Аплікація профілю Бориса Лятошинського. Автор Михайло Медведовський. 1953 рік')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Серед окремих українських композиторів формалізм досить поширений. 
                Візьмемо хоча б творчість Лятошинського. До 1926 р. його творчість іде під лозунгом нейтральності, аполітичності мистецтва. 
                Домінуючі настрої його творчості — занепадництво, песимізм, містика. В творах цього періоду незрозуміла навіть висококваліфікованим музикам музична мова.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([
              normalText(
                'Білокопитов, Олександр. Перебороти формалізм і трюкацтво // Літературна газета. 1936. 29 лютого. № 10'
              )
            ]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([boldText('1938 '), normalText('— нагороджений орденом «Знак Пошани».')]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1939-41 '),
                normalText(
                  `— Голова Правління Спілки Радянських композиторів України. 
                Знятий з посади через критику Другої симфонії (ор. 26, перша редакція 1936 рік, друга редакція — 1940 рік). `
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      }
    ]
  },
  {
    yearTitle: '1940',
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1941-43 '),
                normalText(
                  `— евакуація до міста Саратов (РРСР), працює професором композиції й оркестрування евакуйованої Московської консерваторії,
                 одночасно є співробітником музичного сектору «Радіостанції імені Тараса Шевченка».`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Усе чекаємо й чекаємо, коли ж це вигнання скінчиться, і ми зможемо повернутися хоч у пограбоване й спустошене — наше гніздо. 
                <…> Живеться дуже важко. Усю першу половину дня я зайнятий або в консерваторії, або, ще більше, усілякими побутовими домашніми справами… 
                <…> як орденоносець отримую хліб та інше без черги, але треба ще спіймати момент, коли цей хліб та інше привезуть у магазин. 
                Доводиться по кілька разів на день бігати і ловити момент. <…> За день втомишся, а тут і світла немає. Горить погана коптилка 
                (гасу теж майже не можна дістати). <…> Очі болять. А працювати все-таки доводиться, напружуючи зір.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Рейнгольду Глієру, 24 листопада, 1942. Саратов')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: {
          src: '/images/liatoshynsky-1940.png',
          size: ImagesSizes.BigVertical,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1940-ві роки')]),
            en: makeDoc([normalText('')])
          }
        },
        additionalImage: undefined
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: {
          src: '/images/liatoshynsky-kiev-obs.png',
          size: ImagesSizes.SmallHorizontal,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([
              normalText('Борис Лятошинський та Лев Ревуцький зі студентами Київської консерваторії 1940-ві роки')
            ]),
            en: makeDoc([normalText('')])
          }
        },
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1943-44 '),
                normalText(
                  '— евакуація до міста Москва (РРСР), працює професором реевакуйованої Московської консерваторії.'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1944 '), normalText('— повернення з евакуації до Києва.')]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1944 '),
                normalText(
                  '— художній керівник Київської філармонії (факт і термін перебування на посаді потребує документального підтвердження).'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1944 '),
                normalText(
                  '— художній керівник музичного мовлення Українського радіо (факт і термін перебування на посаді потребує документального підтвердження).'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1945 '),
                normalText(
                  '— присвоєння звання Заслуженого діяча мистецтв УРСР, нагородження медаллю «За доблесний труд у Великій Вітчизняній війні 1941–45».'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1945 '),
                normalText('— присуджено Сталінську премію другого ступеня за «Український квінтет» (ор. 42, 1942).')
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1947-56 '), normalText('— депутат Київської міської ради (чотирьох скликань).')]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1948 '),
                normalText(
                  `— у межах ідеологічної кампанії боротьби з формалізмом, розпочатою постановою
                 ЦК ВКП(б) «Про оперу “Велика дружба” В. Мураделі», Лятошинського було звинувачено у формалізмі, 
                 заборонено до виконання його твори, партитури композицій вилучено з продажу. 
                 Критиці було піддано Другу симфонію і твори 1940-х років, включно з «Українським квінтетом».`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Композитор Лятошинський, який довгий час блукав манівцями формалізму, ще й досі не знайшов мужності визнати помилковість своїх хибних позицій в творчості.
                 <…> Справа йде зовсім не про окремі його помилки, не про окремі винятки <…> а саме про те, що напрямок його творчості знаходиться в орбіті формалізму. 
                 <…> Коли ми звернемося до його Другої симфонії, то в ній ми не знайдемо істотних змін, які б направили його творчість на шлях доступності і зрозумілості
                  для народу. Головна хиба полягає в тому, що в цій симфонії порушено нормальну логіку музичного мислення, в тому, що вона не може доставити насолоду 
                  слухачеві, в тому, що симфонія написана для вузького кола естетів, які загубили почуття прекрасного і красивого.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([
              normalText('Андрій Штогаренко, з виступу на Пленумі Спілки Радянських Композиторів України, 1948')
            ]),
            en: makeDoc([normalText('')])
          }
        }
      }
    ]
  },
  {
    yearTitle: '1950',
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1951 '),
                normalText(
                  '— нагороджений орденом «Знак Пошани» за участь у декаді українського мистецтва у Москві (РРСР). '
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('25 жовтня 1951 '),
                normalText(
                  `— у межах VI пленуму правління Спілки радянських композиторів України відбулася прем’єра Третьої симфонії Лятошинського (ор. 50, перша редакція). 
                  Твір зазнав нищівної критики як в Україні, так і на всесоюзному рівні. 1954 року композитор створив другу редакцію Третьої симфонії, 
                  яка вже зазнала офіційного схвалення.`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Симфонія не виражає тієї глибини ідей, які вкладають усі совєтські люди і прогресивне людство у цю тему. 
                <…> Треба мир і війну розглядати з кута зору совєтського патріотизму. <…> Немає у симфонії ані мелодичності, ні національного характеру. 
                Вона космополітична. Товариші говорили про сумбур. Так, сумбур просто приголомшує, приголомшують дикі звучання та інші речі. 
                Ця музика, яка є за сутністю формалістичною та космополітичною, подається нам під прапором боротьби за мир. `
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([
              normalText('Валеріан Довженко, виступ на VI Пленумі Союзу Совєтських композиторів України, 1948. Київ')
            ]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: {
          src: '/images/liatoshynsky-with-igor-bels.png',
          size: ImagesSizes.SmallVerticalWide,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський з Ігорем Белзою на дачі в Ворзелі. 1950-ті роки')]),
            en: makeDoc([normalText('')])
          }
        },
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1952 '),
                normalText(
                  ' — присуджено Сталінську премію першого ступеня за музику до фільму «Тарас Шевченко» (1951), режисер Ігор Савченко.'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1954, 55 '), normalText('— лікування у санаторії в місті Карлови Вари (Чехія).')]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1956 '),
                normalText(
                  ' — член журі від СРСР на Міжнародному конкурсі творів для струнного квартету у Льєжі (Бельгія).'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Дуже, звісно, цікаво і турбуватися не треба, бо тисячі людей літають туди й сюди і дуже рідко щось трапляється, 
                але все ж таки, можливо, така буде насмішка долі наді мною, що я в перший раз полечу в такі далекі краї і не долечу. 
                Подумавши про це, міцно, міцно цілую тебе, рідна моя, і прошу пам’ятати про мене тільки все хороше, що було, 
                і не згадувати поганого ніколи. Міцно, міцно обіймаю тебе, але вірю в те, що все буде добре.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 16 вересня 1956. Москва')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.FullWidthImage,
        image: {
          src: '/images/liatoshynsky-1950.png',
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1950-ті роки')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1957 '),
                normalText(
                  ` — делегат від СРСР на святкуваннях на честь ювілею Міхаіла Глінки (Софія, Болгарія). 
                  Член президії Союзу радянських композиторів України. Член делегації на фестивалі мистецтв у Берліні (Німеччина).`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Буде, звісно, дуже багато цікавого, але всього не почуєш, тому що в один вечір у різних театрах і залах проходитимуть по два концерти або опери. 
                Буде весь (!) «Перстень нібелунгів» (4 вечори), Моцарта «Чарівна флейта» та «Cosi fаn tutte», Р. Штрауса «Електра»,
                 І. Стравінського «Свадебка», Генделя Ораторія та багато симфонічних творів дуже цікавих, і старих, і нових, але здебільшого класика.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 29 вересня 1957. Берлін')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1958 '),
                normalText(
                  ` — Премія товариства Польсько-Радянської дружби за укріплення і розвиток зв’язків 
                  у галузі музичної культури між Польською народною республікою і СРСР. Відвідання фестивалю «Варшавська осінь». 
                  Член журі у номінації піаністи Першого міжнародного конкурсу піаністів і скрипалів імені П. І. Чайковського (Москва, РФ).`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Сиджу я за довгим столом журі «в капіталістичному оточенні». 
                Праворуч сидять португалець і бразилець, а ліворуч француз маркіз De Gontenu-Byron і Fernand Quinet, мій старий знайомий. 
                З усіма ними я розмовляю по-французьки і під час антрактів, і під час виконання. 
                Перекладаю їм написані російською відомості про конкурсантів тощо. З чехами і ввечері розмовляю німецькою, 
                а з поляками французькою, російською та польською. `
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 4 квітня 1958. Москва')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: {
          src: '/images/liatoshynsky-praga-1950.png',
          size: ImagesSizes.SmallHorizontal,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський (сидить на лавці) у Празі. 1950-ті роки')]),
            en: makeDoc([normalText('')])
          }
        },
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1959 '),
                normalText(
                  ` — відвідування Варшави (Польща) на запрошення товариства Польсько-Радянської дружби. 
                  Член журі від СРСР на Міжнародному конкурсі творів для струнного квартету у Льєжі (Бельгія). 
                  Туристична поїздка до Італії із заїздом до Цюріху (Швейцарія) і Праги (Чехія).`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Жахливо прикро, що нічого не вийде з Неаполем, а значить і з Помпеєю! Бути в Італії і не бачити ні того ні іншого! 
                Просто безглуздість. Ось що значить туристська путівка — десь хтось вирішив, що вистачить з нас чотирьох міст, 
                щоб ми поменше коштували валюти і нічого з цим не зробиш. Це не те, що моя подорож до Бельгії, коли я сам був собі господарем і їхав куди хотів.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 15 жовтня 1959')]),
            en: makeDoc([normalText('')])
          }
        }
      }
    ]
  },
  {
    yearTitle: '1960',
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('1960 '),
                normalText(' — туристична поїздка по Дунаю з відвідуванням столиць придунайських держав.')
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1961 '),
                normalText(
                  ` — туристична поїздка до Італії. Поїздка до Великої Британії 
                  (разом із російським композитором Кирилом Молчановим) на запрошення
                 Спілки британських композиторів. Туристична поїздка до Франції.`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1962 '),
                normalText(
                  ' — член журі у номінації піаністи Другого міжнародного конкурсу імені П. І. Чайковського (Москва, РФ).поїздка до Бельгії.'
                )
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Тричі я був у Брюґґе, і третій раз, 1962 року, дійсно сидів на площі перед вежею, ледь видною у тумані, 
                і куранти звучали здалека навіть тоді, коли я вже дістався вокзалу, щоб повертатися на ніч до Брюсселю.`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Анатолію Дмитрієву, 25 грудня, 1965. Київ')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: {
          src: '/images/liatoshynsky-worsel-1967.png',
          size: ImagesSizes.SmallHorizontal,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([
              normalText(
                'На дачі в Ворзелі. Валентин Сильвестров, Борис Лятошинський, Ігор Блажков, Віталій Годзяцький. 1967-й рік.'
              )
            ]),
            en: makeDoc([normalText('')])
          }
        },
        listItems: [
          {
            description: {
              uk: makeDoc([boldText('1963 '), normalText('— туристична поїздка до Австрії.')]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1965 '),
                normalText(
                  `— переведення на посаду професора-консультанта з навантаженням 0,5 ставки у Київській консерваторії у зв’язку з переходом
                 на академічну пенсію. Туристична поїздка до Австрії і Швейцарії.`
                )
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1967 '), normalText('— поїздка на фестиваль «Варшавська осінь» (Польща).')]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeDoc([
              normalText(
                `Б. Лятошинський був унікальним. Наприклад, він щороку їздив на фестиваль «Варшавська осінь» до Польщі і привозив звідти безліч записів. 
             Іноді ми, його учні, спільно з ним слухали ці записи — опуси Кшиштофа Пендерецького, Вітольда Лютославського, — 
             висловлюючи свої враження про музику цих авторів. Саме так він збагачував наші світоглядні уявлення. 
             Тому не випадково вихідці з його класу — В. Сильвестров, Л. Грабовський, В. Годзяцький — були більш схильні до новацій, тобто до музики нового типу`
              )
            ]),
            en: makeDoc([normalText('')])
          },
          sourceText: {
            uk: makeDoc([normalText('Євген Станкович, спогади про Бориса Лятошинського, 2014')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.FullWidthImage,
        image: {
          src: '/images/liatoshynsky-home-office.png',
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський вдома в робочому кабінеті. 1960-ті роки')]),
            en: makeDoc([normalText('')])
          }
        }
      },
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [
          {
            description: {
              uk: makeDoc([
                boldText('12 лютого 1968 '),
                normalText('— присвоєно звання народного артиста Української РСР.')
              ]),
              en: makeDoc([boldText('')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('15 квітня 1968'),
                normalText(', у ніч з Вербної неділі на Страсний понеділок помер Борис Лятошинський.')
              ]),
              en: makeDoc([boldText('')])
            }
          }
        ]
      }
    ]
  }
];
