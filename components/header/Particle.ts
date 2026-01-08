export type ParticleConfig = {
   maxSpeed: number;
   radius: [number, number];
   mouseInfluence: number;
   repelStrength: number;
};

export class Particle {
   x = 0;
   y = 0;
   vx = 0;
   vy = 0;
   r = 0;

   constructor(
      private ctx: CanvasRenderingContext2D,
      private config: ParticleConfig,
      private getBounds: () => { W: number; H: number; DPR: number },
      randomPos = true
   ) {
      this.reset(randomPos);
   }

   private rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
   }

   reset(randomPos = false) {
      const { W, H, DPR } = this.getBounds();

      this.x = randomPos ? this.rand(0, W) : Math.random() < 0.5 ? 0 : W;
      this.y = randomPos ? this.rand(0, H) : this.rand(0, H);

      const ang = this.rand(0, Math.PI * 2);
      const speed = this.rand(0.05, this.config.maxSpeed);

      this.vx = Math.cos(ang) * speed;
      this.vy = Math.sin(ang) * speed;
      this.r = this.rand(this.config.radius[0], this.config.radius[1]) * DPR;
   }

   step(mx: number | null, my: number | null) {
      const { DPR, W, H } = this.getBounds();

      if (mx !== null && my !== null) {
         const dx = this.x - mx;
         const dy = this.y - my;
         const d2 = dx * dx + dy * dy;
         const r = this.config.mouseInfluence * DPR;
         const r2 = r * r;

         if (d2 < r2) {
            const d = Math.sqrt(d2) || 0.001;
            const force = (this.config.repelStrength * (1 - d / r)) / d;
            this.vx += dx * force;
            this.vy += dy * force;
         }
      }

      const sp = Math.hypot(this.vx, this.vy);
      if (sp > this.config.maxSpeed) {
         const ratio = this.config.maxSpeed / sp;
         this.vx *= ratio;
         this.vy *= ratio;
      }

      this.x += this.vx * DPR;
      this.y += this.vy * DPR;

      if (this.x < -50) this.x = W + 50;
      else if (this.x > W + 50) this.x = -50;

      if (this.y < -50) this.y = H + 50;
      else if (this.y > H + 50) this.y = -50;
   }

   draw(color: string) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.fill();
   }
}
