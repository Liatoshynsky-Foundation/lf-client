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
              en: makeDoc([
                boldText('3 January 1895 '),
                normalText('(22 December 1894 in the Old Style) — Borys Lyatoshynsky was born in Zhytomyr.')
              ])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1904-06 '), normalText('— навчання у Першій київській гімназії.')]),
              en: makeDoc([boldText('1904–06 '), normalText('— studies at the First Kyiv Gymnasium.')])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1906-08 '), normalText('— навчання у Немирівській чоловічій гімназії.')]),
              en: makeDoc([boldText('1906–08 '), normalText('— studies at the Nemyriv Boys’ Gymnasium.')])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1908-11 '), normalText('— навчання у Златопільській чоловічій гімназії.')]),
              en: makeDoc([boldText('1908–11 '), normalText('— studies at the Zlatopil Boys’ Gymnasium.')])
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
              en: makeDoc([
                boldText('1910 '),
                normalText('— composition of his first piano works ('),
                boldText('Mazurka'),
                normalText(' and '),
                boldText('Waltz'),
                normalText(').')
              ])
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
            en: makeDoc([
              normalText(
                `It was precisely during my years at the Zlatopil Gymnasium that I truly began to take an interest in music. 
                At first I began to learn to play the violin with the local gymnasium teacher, Bentsion Symonovych Khaimovsky, 
                and later I played in the student orchestra conducted by the same B. Khaimovsky. Then, at the beginning of 1910, 
                while I was in the fifth form of the gymnasium, I began to try my hand at composing. Thus my first, naturally very 
                immature attempts as a composer date precisely from the Zlatopil period.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського, 21.01.1959. Київ')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky, 21 January 1959, Kyiv')])
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
              en: makeDoc([boldText('1911–13 '), normalText('— studies at the Second Zhytomyr Gymnasium.')])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1913-18 '),
                normalText('— навчання в Імператорському університеті Св. Володимира в Києві, юридичний факультет.')
              ]),
              en: makeDoc([
                boldText('1913–18 '),
                normalText('— studies at the St Volodymyr Imperial University in Kyiv, Faculty of Law.')
              ])
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
            en: makeDoc([
              normalText(
                `I have already told you that I have registered for two more examinations. 
                I have already bought both books. They are very large and horribly 
                disgusting books. Roman law in particular. Never in my life have I seen such 
                filth! Oh, these Romans!`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 5 травня 1916. Саратов')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Marharyta Tsarevych, 5 May 1916, Saratov')])
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
            en: makeDoc([normalText('Borys Lyatoshynsky. 1910s')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1910-ті роки')]),
            en: makeDoc([normalText('Borys Lyatoshynsky. 1910s')])
          }
        },
        additionalImage: {
          src: '/images/boris-tsarevich-1914.png',
          size: ImagesSizes.SmallVerticalThin,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([
              normalText('Borys Lyatoshynsky. Photograph by Borys Tsarevych (his wife’s brother). Around 1914')
            ])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. Автор Борис Царевич (брат дружини). Близько 1914-го року')]),
            en: makeDoc([
              normalText('Borys Lyatoshynsky. Photograph by Borys Tsarevych (his wife’s brother). Around 1914')
            ])
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
              en: makeDoc([boldText('1914 '), normalText('— private studies in composition with Reinhold Glière.')])
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
              en: makeDoc([
                boldText('1914–19 '),
                normalText(
                  '— studies at the Kyiv Conservatory, majoring in composition in the class of Reinhold Glière.'
                )
              ])
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
            en: makeDoc([
              normalText(
                `In the autumn of 1914 I entered the Kyiv Conservatory, in the composition class of R. M. 
                Glière. <…> With us, his students at the Kyiv Conservatory, Reinhold Morytsevych 
                worked on all the music-theoretical disciplines, that is, harmony, polyphony, 
                orchestration, form and composition. There were not many students of Reinhold Morytsevych, 
                only nine or ten in all. <…> We met with Reinhold Morytsevych twice a week, on Tuesdays 
                and Fridays in the evening, regardless of who was in which year of study. As a rule, 
                we all sat in the classroom from the beginning to the end of the lessons, until the last 
                of us had finished working with Reinhold Morytsevych and left.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Борис Лятошинський, спогади про Глієра, 1965')]),
            en: makeDoc([normalText('Borys Lyatoshynsky, reminiscences about Glière, 1965')])
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
              en: makeDoc([boldText('1917 '), normalText('— wedding with Marharyta Tsarevych.')])
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
            en: makeDoc([
              normalText(
                `Ah, my dear, my dear little cat, when will that time finally come when we shall be together, 
                in the drawing room where it is so beautiful, with a grand piano standing there and many scores.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 4 травня 1916. Саратов')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Marharyta Tsarevych, 4 May 1916, Saratov')])
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
            en: makeDoc([normalText('Tetiana Homon and the team of the Lyatoshynsky Foundation. 1910s')])
          },
          caption: {
            uk: makeDoc([normalText('Тетяна Гомон та команда Фонду Лятошинського. 1910-ті роки')]),
            en: makeDoc([normalText('Tetiana Homon and the team of the Lyatoshynsky Foundation. 1910s')])
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
              en: makeDoc([
                boldText('1917–19 '),
                normalText(
                  `— teaching: A. Talnovsky’s Music and Drama Courses, 
                the private music school of Yakobi-Pavlovych, and the summer courses of the Kyiv Conservatory.`
                )
              ])
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
              en: makeDoc([boldText('from 1920 '), normalText('— member of the professional union of art workers.')])
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
              en: makeDoc([
                boldText('1920–1941 and 1944–1968 '),
                normalText(
                  `— teaching a cycle of music-theoretical disciplines and leading the class in composition and orchestration at the Kyiv State 
                Conservatory (now the National Music Academy of Ukraine). From 1924 to 1934 the Conservatory changed its status 
                to a Music Technicum, became part of the Mykola Lysenko Music and Drama Institute, and eventually returned to its 
                original status and name.
                 `
                )
              ])
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
            en: makeDoc([
              normalText(
                `By the way, I would like to tell you some very pleasant news: from this year I have been given 
                my own special theory class at the Conservatory (harmony and counterpoint). 
                I already have about fifteen students. I am, of course, very glad about this: in any case, this is nothing like 
                those unfortunate obligatory subjects.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Рейнгольду Глієру, листопад–грудень, 1922. Київ')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Reinhold Glière, November–December 1922, Kyiv')])
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
            en: makeDoc([normalText('Borys Lyatoshynsky. 1920s')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1920-ті роки')]),
            en: makeDoc([normalText('Borys Lyatoshynsky. 1920s')])
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
              en: makeDoc([
                boldText('1926 '),
                normalText(
                  '— Lyatoshynsky becomes a member of the Association for Contemporary Music, founded at the Kyiv branch of the “Mykola D. Leontovych Music Society”.'
                )
              ])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1913-18 '),
                normalText('— навчання в Імператорському університеті Св. Володимира в Києві, юридичний факультет.')
              ]),
              en: makeDoc([
                boldText('1913–18 '),
                normalText('— studies at the St Volodymyr Imperial University in Kyiv, Faculty of Law.')
              ])
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
            en: makeDoc([
              normalText(
                `Recently I have heard a great deal of new music on the radio: Schoenberg, Schreker, Korngold and other, apparently younger, composers. 
                In Germany such performances take place quite often, and they are evidently given great importance. 
                Not long ago Schreker himself conducted his latest work — a Suite for chamber orchestra, written specially for the Breslau Radio and dedicated to it.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 24 січня 1929. Київ')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Marharyta Tsarevych, 24 January 1929, Kyiv')])
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
              en: makeDoc([
                boldText('1928 '),
                normalText('— member of the “All-Ukrainian Association of Proletarian Musicians”.')
              ])
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
              en: makeDoc([
                boldText('1931 '),
                normalText(
                  '— begins working at the Kyiv Film Studio (now the Oleksandr Dovzhenko National Film Studio), composing the music for the film “Karmeliuk”, directed by Favst Lopatyinsky.'
                )
              ])
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
              en: makeDoc([
                boldText('1932 '),
                normalText(
                  `— begins cooperation with the Theatre of Russian Drama (now the Lesia Ukrainka National Academic Drama Theatre). 
                  Composes the music for the production of Vsevolod Vishnevsky’s play “Optimistic Tragedy”, directed by Volodymyr Nelli (the score has not survived).`
                )
              ])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1935 '),
                normalText('— присвоєно вчена звання професора за спеціальністю «Теорія музики і композиція».')
              ]),
              en: makeDoc([
                boldText('1935 '),
                normalText('— awarded the academic title of Professor in the specialty “Music Theory and Composition”.')
              ])
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
              en: makeDoc([
                boldText('1935–38 '),
                normalText(
                  '— concurrently Professor of Composition and Orchestration at the Moscow State Conservatory (RSFSR).'
                )
              ])
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
              en: makeDoc([
                boldText('1936–37 '),
                normalText(
                  `— a period of fierce criticism of Lyatoshynsky’s works and accusations of formalism, against the background of an all-Soviet campaign launched in Moscow with attacks on Dmitri Shostakovich’s ballet “The Bright Stream” and opera “Lady Macbeth of the Mtsensk District”, 
                  published in editorial articles in the newspaper “Pravda” and reprinted in the Ukrainian press. 
                  Lyatoshynsky’s works from the 1920s and the opera “The Golden Ring” (op. 23, 1929) were subjected to criticism.`
                )
              ])
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
            en: makeDoc([normalText('Borys Lyatoshynsky. 1930s')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1930-ті роки')]),
            en: makeDoc([normalText('Borys Lyatoshynsky. 1930s')])
          }
        },
        additionalImage: {
          src: '/images/liatoshynsky-application.png',
          size: ImagesSizes.SmallVerticalThin,
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('Paper cut-out profile of Borys Lyatoshynsky. Artist Mykhailo Medvedovsky. 1953')])
          },
          caption: {
            uk: makeDoc([normalText('Аплікація профілю Бориса Лятошинського. Автор Михайло Медведовський. 1953 рік')]),
            en: makeDoc([normalText('Paper cut-out profile of Borys Lyatoshynsky. Artist Mykhailo Medvedovsky. 1953')])
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
            en: makeDoc([
              normalText(
                `Formalism is quite widespread among certain Ukrainian composers. 
                Let us take, for example, the work of Lyatoshynsky. Until 1926 his work proceeded under the slogan of the neutrality and apolitical nature of art. 
                The dominant moods of his work are decadence, pessimism and mysticism. In the works of this period even musically highly qualified listeners find the musical language incomprehensible.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([
              normalText(
                'Білокопитов, Олександр. Перебороти формалізм і трюкацтво // Літературна газета. 1936. 29 лютого. № 10'
              )
            ]),
            en: makeDoc([
              normalText(
                'Oleksandr Bilokopytov. “Overcoming Formalism and Trickery” // Literaturna hazeta. 29 February 1936. No. 10'
              )
            ])
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
              en: makeDoc([boldText('1938 '), normalText('— awarded the Order of the Badge of Honour.')])
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
              en: makeDoc([
                boldText('1939–41 '),
                normalText(
                  `— Chairman of the Board of the Union of Soviet Composers of Ukraine. 
                Removed from this position due to criticism of the Second Symphony (op. 26, first version 1936, second version 1940). `
                )
              ])
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
              en: makeDoc([
                boldText('1941–43 '),
                normalText(
                  `— evacuated to the city of Saratov (RSFSR), works as Professor of Composition and Orchestration at the evacuated Moscow Conservatory, 
                 and simultaneously is a staff member of the music department of the “Taras Shevchenko Radio Station”.`
                )
              ])
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
            en: makeDoc([
              normalText(
                `We keep waiting and waiting for this exile to end so that we can return at least to a plundered and devastated — but our own — nest. 
                <…> Life is very hard. The whole first half of the day I am occupied either at the Conservatory or, even more, with all kinds of everyday household tasks… 
                <…> As a holder of an order I receive bread and other things without queuing, but I still have to catch the moment when this bread and other goods are delivered to the shop. 
                I have to run there several times a day and try to catch the right moment. <…> By the end of the day one is exhausted, and there is no light. A poor little oil lamp is burning 
                (paraffin is also almost impossible to get). <…> My eyes hurt. And yet I still have to work, straining my eyesight.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Рейнгольду Глієру, 24 листопада, 1942. Саратов')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Reinhold Glière, 24 November 1942, Saratov')])
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
            en: makeDoc([normalText('Borys Lyatoshynsky. 1940s')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1940-ві роки')]),
            en: makeDoc([normalText('Borys Lyatoshynsky. 1940s')])
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
            en: makeDoc([
              normalText('Borys Lyatoshynsky and Lev Revutsky with students of the Kyiv Conservatory. 1940s')
            ])
          },
          caption: {
            uk: makeDoc([
              normalText('Борис Лятошинський та Лев Ревуцький зі студентами Київської консерваторії 1940-ві роки')
            ]),
            en: makeDoc([
              normalText('Borys Lyatoshynsky and Lev Revutsky with students of the Kyiv Conservatory. 1940s')
            ])
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
              en: makeDoc([
                boldText('1943–44 '),
                normalText(
                  '— evacuated to the city of Moscow (RSFSR), works as Professor at the re-evacuated Moscow Conservatory.'
                )
              ])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1944 '), normalText('— повернення з евакуації до Києва.')]),
              en: makeDoc([boldText('1944 '), normalText('— returns from evacuation to Kyiv.')])
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
              en: makeDoc([
                boldText('1944 '),
                normalText(
                  '— Artistic Director of the Kyiv Philharmonic (the fact and length of tenure still require documentary confirmation).'
                )
              ])
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
              en: makeDoc([
                boldText('1944 '),
                normalText(
                  '— Artistic Director of music broadcasting of Ukrainian Radio (the fact and length of tenure still require documentary confirmation).'
                )
              ])
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
              en: makeDoc([
                boldText('1945 '),
                normalText(
                  '— awarded the title Merited Artist of the Ukrainian SSR and the medal “For Valiant Labour in the Great Patriotic War 1941–45”.'
                )
              ])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('1945 '),
                normalText('— присуджено Сталінську премію другого ступеня за «Український квінтет» (ор. 42, 1942).')
              ]),
              en: makeDoc([
                boldText('1945 '),
                normalText(
                  '— awarded the Stalin Prize of the second degree for the “Ukrainian Quintet” (op. 42, 1942).'
                )
              ])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1947-56 '), normalText('— депутат Київської міської ради (чотирьох скликань).')]),
              en: makeDoc([
                boldText('1947–56 '),
                normalText('— deputy of the Kyiv City Council (four consecutive convocations).')
              ])
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
              en: makeDoc([
                boldText('1948 '),
                normalText(
                  `— within the ideological campaign against formalism launched by the decree of the Central Committee of the All-Union Communist Party (Bolsheviks) 
                 “On the Opera ‘The Great Friendship’ by Vano Muradeli”, Lyatoshynsky was accused of formalism, 
                 his works were banned from performance, and the scores of his compositions were withdrawn from sale. 
                 The Second Symphony and works of the 1940s, including the “Ukrainian Quintet”, were subjected to criticism.`
                )
              ])
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
            en: makeDoc([
              normalText(
                `Composer Lyatoshynsky, who has long wandered down the paths of formalism, has still not found the courage to admit the erroneousness of his misguided artistic stance. 
                 <…> The issue here is not at all about individual mistakes, about isolated exceptions <…> but about the fact that the general direction of his work lies within the orbit of formalism. 
                 <…> When we turn to his Second Symphony, we do not find in it any substantial changes that would lead his art onto the path of accessibility and comprehensibility for the people. 
                  Its chief fault lies in the violation of the normal logic of musical thinking, in the fact that it cannot bring enjoyment to the listener, and in the fact that the symphony is written for a narrow circle of aesthetes who have lost their sense of the beautiful.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([
              normalText('Андрій Штогаренко, з виступу на Пленумі Спілки Радянських Композиторів України, 1948')
            ]),
            en: makeDoc([
              normalText(
                'Andrii Shtoharenko, from a speech at the Plenum of the Union of Soviet Composers of Ukraine, 1948'
              )
            ])
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
              en: makeDoc([
                boldText('1951 '),
                normalText(
                  '— awarded the Order of the Badge of Honour for his participation in the Decade of Ukrainian Art in Moscow (RSFSR). '
                )
              ])
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
              en: makeDoc([
                boldText('25 October 1951 '),
                normalText(
                  `— during the Sixth Plenum of the Board of the Union of Soviet Composers of Ukraine, the premiere of Lyatoshynsky’s Third Symphony (op. 50, first version) took place. 
                  The work was subjected to devastating criticism both in Ukraine and at the all-Union level. In 1954 the composer created a second version of the Third Symphony, 
                  which subsequently received official approval.`
                )
              ])
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
            en: makeDoc([
              normalText(
                `The symphony does not express the depth of ideas that all Soviet people and progressive humanity invest in this theme. 
                <…> Peace and war must be viewed from the standpoint of Soviet patriotism. <…> There is neither melodiousness nor national character in this symphony. 
                It is cosmopolitan. Comrades have spoken of confusion. Yes, the confusion is simply overwhelming; overwhelming are the wild sonorities and other such things. 
                This music, which is in essence formalist and cosmopolitan, is being presented to us under the banner of the struggle for peace. `
              )
            ])
          },
          sourceText: {
            uk: makeDoc([
              normalText('Валеріан Довженко, виступ на VI Пленумі Союзу Совєтських композиторів України, 1948. Київ')
            ]),
            en: makeDoc([
              normalText(
                'Valerian Dovzhenko, speech at the Sixth Plenum of the Union of Soviet Composers of Ukraine, 1948, Kyiv'
              )
            ])
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
            en: makeDoc([normalText('Borys Lyatoshynsky with Ihor Belza at a dacha in Vorzel. 1950s')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський з Ігорем Белзою на дачі в Ворзелі. 1950-ті роки')]),
            en: makeDoc([normalText('Borys Lyatoshynsky with Ihor Belza at a dacha in Vorzel. 1950s')])
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
              en: makeDoc([
                boldText('1952 '),
                normalText(
                  ' — awarded the Stalin Prize of the first degree for the music to the film “Taras Shevchenko” (1951), directed by Ihor Savchenko.'
                )
              ])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1954, 55 '), normalText('— лікування у санаторії в місті Карлови Вари (Чехія).')]),
              en: makeDoc([
                boldText('1954, 55 '),
                normalText('— treatment at a sanatorium in Karlovy Vary (Czech Republic).')
              ])
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
              en: makeDoc([
                boldText('1956 '),
                normalText(
                  ' — member of the jury representing the USSR at the International Competition for String Quartet Works in Liège (Belgium).'
                )
              ])
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
            en: makeDoc([
              normalText(
                `It is, of course, very interesting and there is no need to worry, for thousands of people fly back and forth and very rarely does anything happen, 
                but still, perhaps fate will play such a joke on me that on my very first flight to such distant lands I shall not arrive. 
                Thinking of this, I kiss you very, very tenderly, my dearest, and ask you to remember only all the good that there has been about me 
                and never to recall the bad. I embrace you very, very tightly, yet I believe that everything will be all right.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 16 вересня 1956. Москва')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Marharyta Tsarevych, 16 September 1956, Moscow')])
          }
        }
      },
      {
        type: ContentType.FullWidthImage,
        image: {
          src: '/images/liatoshynsky-1950.png',
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('Borys Lyatoshynsky. 1950s')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський. 1950-ті роки')]),
            en: makeDoc([normalText('Borys Lyatoshynsky. 1950s')])
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
              en: makeDoc([
                boldText('1957 '),
                normalText(
                  ` — delegate representing the USSR at the celebrations of the jubilee of Mikhail Glinka (Sofia, Bulgaria). 
                  Member of the Presidium of the Union of Soviet Composers of Ukraine. Member of the delegation to the Festival of Arts in Berlin (Germany).`
                )
              ])
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
            en: makeDoc([
              normalText(
                `There will, of course, be a great many interesting things, but you will not hear everything, because on a single evening in different theatres and halls there will be two concerts or operas taking place. 
                The entire “Ring of the Nibelung” (!) will be performed (four evenings), Mozart’s “The Magic Flute” and “Così fan tutte”, R. Strauss’s “Elektra”, 
                 I. Stravinsky’s “Les Noces”, a Handel oratorio, and many very interesting symphonic works, both old and new, but mostly from the classical repertoire.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 29 вересня 1957. Берлін')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Marharyta Tsarevych, 29 September 1957, Berlin')])
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
              en: makeDoc([
                boldText('1958 '),
                normalText(
                  ` — Prize of the Polish–Soviet Friendship Society for the strengthening and development of ties 
                  in the sphere of musical culture between the Polish People’s Republic and the USSR. Visit to the “Warsaw Autumn” festival. 
                  Member of the jury in the piano category at the First International Tchaikovsky Piano and Violin Competition (Moscow, Russian Federation).`
                )
              ])
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
            en: makeDoc([
              normalText(
                `I sit at the long table of the jury “in capitalist surroundings”. 
                On my right sit a Portuguese and a Brazilian, and on my left a Frenchman, Marquis de Gontenu-Byron, and Fernand Quinet, an old acquaintance of mine. 
                I speak French with all of them, both during the intervals and during the performances. 
                I translate for them the information about the competitors written in Russian, and so on. In the evenings I speak German with the Czechs 
                and French, Russian and Polish with the Poles. `
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 4 квітня 1958. Москва')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Marharyta Tsarevych, 4 April 1958, Moscow')])
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
            en: makeDoc([normalText('Borys Lyatoshynsky (seated on the bench) in Prague. 1950s')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський (сидить на лавці) у Празі. 1950-ті роки')]),
            en: makeDoc([normalText('Borys Lyatoshynsky (seated on the bench) in Prague. 1950s')])
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
              en: makeDoc([
                boldText('1959 '),
                normalText(
                  ` — visit to Warsaw (Poland) at the invitation of the Polish–Soviet Friendship Society. 
                  Member of the jury representing the USSR at the International Competition for String Quartet Works in Liège (Belgium). 
                  Tourist trip to Italy with stops in Zurich (Switzerland) and Prague (Czech Republic).`
                )
              ])
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
            en: makeDoc([
              normalText(
                `It is terribly upsetting that nothing will come of Naples and therefore of Pompeii! To be in Italy and see neither the one nor the other! 
                It is simply absurd. This is what a tourist package means — somewhere someone has decided that four cities are enough for us, 
                so that we cost less in foreign currency, and nothing can be done about it. This is not like my trip to Belgium, when I was my own master and went wherever I wanted.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Маргариті Царевич, 15 жовтня 1959')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Marharyta Tsarevych, 15 October 1959')])
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
              en: makeDoc([
                boldText('1960 '),
                normalText(' — tourist trip along the Danube with visits to the capitals of the Danubian countries.')
              ])
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
              en: makeDoc([
                boldText('1961 '),
                normalText(
                  ` — tourist trip to Italy. Trip to Great Britain 
                  (together with Russian composer Kirill Molchanov) at the invitation of the 
                 Society of British Composers. Tourist trip to France.`
                )
              ])
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
              en: makeDoc([
                boldText('1962 '),
                normalText(
                  ' — member of the jury in the piano category at the Second International Tchaikovsky Competition (Moscow, Russian Federation). Trip to Belgium.'
                )
              ])
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
            en: makeDoc([
              normalText(
                `I have been to Bruges three times, and the third time, in 1962, I really did sit on the square in front of the tower, barely visible in the mist, 
                and the chimes could be heard in the distance even when I had already reached the station to return to Brussels for the night.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Лист Бориса Лятошинського Анатолію Дмитрієву, 25 грудня, 1965. Київ')]),
            en: makeDoc([normalText('Letter by Borys Lyatoshynsky to Anatolii Dmytriiev, 25 December 1965, Kyiv')])
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
            en: makeDoc([
              normalText(
                'At the dacha in Vorzel. Valentyn Silvestrov, Borys Lyatoshynsky, Ihor Blazhkov, Vitalii Hodziatskyi. 1967'
              )
            ])
          },
          caption: {
            uk: makeDoc([
              normalText(
                'На дачі в Ворзелі. Валентин Сильвестров, Борис Лятошинський, Ігор Блажков, Віталій Годзяцький. 1967-й рік.'
              )
            ]),
            en: makeDoc([
              normalText(
                'At the dacha in Vorzel. Valentyn Silvestrov, Borys Lyatoshynsky, Ihor Blazhkov, Vitalii Hodziatskyi. 1967'
              )
            ])
          }
        },
        listItems: [
          {
            description: {
              uk: makeDoc([boldText('1963 '), normalText('— туристична поїздка до Австрії.')]),
              en: makeDoc([boldText('1963 '), normalText('— tourist trip to Austria.')])
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
              en: makeDoc([
                boldText('1965 '),
                normalText(
                  `— transferred to the position of Professor-Consultant with a half-time teaching load at the Kyiv Conservatory in connection with his transition 
                 to an academic pension. Tourist trip to Austria and Switzerland.`
                )
              ])
            }
          },
          {
            description: {
              uk: makeDoc([boldText('1967 '), normalText('— поїздка на фестиваль «Варшавська осінь» (Польща).')]),
              en: makeDoc([boldText('1967 '), normalText('— trip to the “Warsaw Autumn” festival (Poland).')])
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
            en: makeDoc([
              normalText(
                `B. Lyatoshynsky was unique. For example, every year he went to the “Warsaw Autumn” festival in Poland and brought back countless recordings. 
             Sometimes we, his students, would listen to these recordings together with him — works by Krzysztof Penderecki, Witold Lutosławski — 
             sharing our impressions of the music of these composers. In this way he broadened our world views. 
             It is therefore no coincidence that those who came out of his class — V. Silvestrov, L. Hrabovsky, V. Hodziatsky — were more inclined to innovation, that is, to music of a new type.`
              )
            ])
          },
          sourceText: {
            uk: makeDoc([normalText('Євген Станкович, спогади про Бориса Лятошинського, 2014')]),
            en: makeDoc([normalText('Yevhen Stankovych, reminiscences about Borys Lyatoshynsky, 2014')])
          }
        }
      },
      {
        type: ContentType.FullWidthImage,
        image: {
          src: '/images/liatoshynsky-home-office.png',
          alt: {
            uk: makeDoc([normalText('')]),
            en: makeDoc([normalText('Borys Lyatoshynsky at home in his study. 1960s')])
          },
          caption: {
            uk: makeDoc([normalText('Борис Лятошинський вдома в робочому кабінеті. 1960-ті роки')]),
            en: makeDoc([normalText('Borys Lyatoshynsky at home in his study. 1960s')])
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
              en: makeDoc([
                boldText('12 February 1968 '),
                normalText('— awarded the title People’s Artist of the Ukrainian SSR.')
              ])
            }
          },
          {
            description: {
              uk: makeDoc([
                boldText('15 квітня 1968'),
                normalText(', у ніч з Вербної неділі на Страсний понеділок помер Борис Лятошинський.')
              ]),
              en: makeDoc([
                boldText('15 April 1968'),
                normalText(', on the night from Palm Sunday to Holy Monday, Borys Lyatoshynsky died.')
              ])
            }
          }
        ]
      }
    ]
  }
];
