
import Image from 'next/image';

const AboutUsPage = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-8 md:py-12 lg:mt-20">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-foreground mb-4">
            Sobre o OnTech Blog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Seu guia diário para as últimas novidades e tendências no mundo da tecnologia.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="md:order-2">
            <Image
              src="/og-image.png" // Altere para o caminho da sua imagem
              alt="Equipe do OnTech Blog trabalhando"
              width={600}
              height={400}
              layout="responsive"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground mb-4">
              Nossa Missão
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4">
              No OnTech Blog, nossa missão é democratizar o acesso à informação tecnológica, tornando tópicos complexos compreensíveis e acessíveis para todos. Acreditamos que o conhecimento é a chave para o futuro e estamos comprometidos em trazer as notícias mais relevantes, análises aprofundadas e tendências emergentes diretamente para você, todos os dias.
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              Seja você um entusiasta de tecnologia, um profissional da área ou alguém que busca se manter atualizado, o OnTech Blog é o seu parceiro confiável para navegar no universo digital.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center text-primary dark:text-primary-foreground mb-8">
            Quem Somos
          </h2>
          <div className="flex items-center justify-center gap-8">
            {/* Exemplo de membro da equipe 1 */}
            <div className="bg-card dark:bg-muted lg:p-6 p-3 rounded-lg shadow-md text-center max-w-xl">
              <Image
                src="/author.png" // Altere para o caminho da imagem do membro
                alt="Foto de Perfil do Membro da Equipe 1"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground mb-2">Juliano Santos</h3>
              <p className="text-sm text-muted-foreground mb-2">Editor Chefe</p>
              <p className="text-base text-muted-foreground">
                Desenvolvedor fullstack apaixonado e editor-chefe do OnTech Blog. Minha jornada do front-end ao back-end me tornou versátil na entrega de soluções eficientes. Lidero nossa equipe para garantir conteúdo tecnológico inovador e de alta qualidade, com rigorosa revisão humana. Sou adepto de boas práticas e estou em constante aprendizado, trazendo as últimas tendências para você. Sua confiança é minha prioridade!
              </p>
            </div>

            {/* Exemplo de membro da equipe 2 */}
            {/*  <div className="bg-card dark:bg-muted p-6 rounded-lg shadow-md text-center">
              <Image
                src="/images/team-member-2.jpg" // Altere para o caminho da imagem do membro
                alt="Foto de Perfil do Membro da Equipe 2"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground mb-2">Maria Oliveira</h3>
              <p className="text-sm text-muted-foreground mb-2">Redatora Sênior</p>
              <p className="text-base text-muted-foreground">
                Especialista em inteligência artificial e cibersegurança, Maria traz análises aprofundadas e perspectivas únicas.
              </p>
            </div> */}

            {/* Exemplo de membro da equipe 3 */}
            {/* <div className="bg-card dark:bg-muted p-6 rounded-lg shadow-md text-center">
              <Image
                src="/images/team-member-3.jpg" // Altere para o caminho da imagem do membro
                alt="Foto de Perfil do Membro da Equipe 3"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground mb-2">Pedro Santos</h3>
              <p className="text-sm text-muted-foreground mb-2">Desenvolvedor e Analista</p>
              <p className="text-base text-muted-foreground">
                Pedro é o cérebro por trás de nossa infraestrutura e garante que o OnTech Blog esteja sempre à frente em performance e inovação.
              </p>
            </div> */}
          </div>
        </section>

        <section className="text-center py-8 bg-accent/20 dark:bg-muted/20 rounded-lg">
          <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground mb-4">
            Nosso Compromisso
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            No OnTech Blog, combinamos inovação e expertise humana para trazer o melhor conteúdo. Nossos artigos são criados com o apoio de inteligência artificial, otimizando a velocidade e abrangência das informações. No entanto, é a nossa equipe de especialistas que garante a qualidade, precisão e imparcialidade de cada texto. Cada conteúdo passa por uma rigorosa revisão humana para assegurar que você receba informações confiáveis e de alta qualidade. Sua confiança é a nossa prioridade.
          </p>
        </section>
      </main>
    </>
  );
};

export default AboutUsPage;